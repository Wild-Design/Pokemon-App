import axios from "axios";
import { Request, Response } from "express";
import { AxiosResponse } from "axios"; //esto lo traje para que ande el coso

export const getAllPokemons = async (req: Request, res: Response) => {
  const API = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40");
  const DATA = API.data.results;

  const promises: Promise<AxiosResponse<any, any>>[] = [];

  DATA.forEach((url: any) => promises.push(axios.get(url.url)));
  const responses: any = await Promise.all(promises);

  const results: any = responses.map((response: any) => response.data);

  const POKE_API = [];
  for (let i = 0; i < results.length; i++) {
    POKE_API.push({
      id: results[i].id,
      name: results[i].name,
      imagen: [
        results[i].sprites.other["official-artwork"]["front_default"],
        results[i].sprites.other["official-artwork"]["front_shiny"],
      ],
      tipos: results[i].types.map((tipo: any) => tipo.type.name),
      vida: results[i].stats[0]["base_stat"],
      ataque: results[i].stats[1]["base_stat"],
      defensa: results[i].stats[2]["base_stat"],
      velocidad: results[i].stats[3]["base_stat"],
      altura: results[i].height,
      peso: results[i].weight,
    });
  }

  res.status(200).send(POKE_API);
};
