import axios from "axios";
import { Request, Response } from "express";
import { AxiosResponse } from "axios"; //esto lo traje para que ande el coso
import db from "../db";
const { Pokemon, Tipo } = db;

interface Url {
  url: string;
}
interface PokeFormat {
  id: number;
  nombre: string;
  imagen: [string, string];
  tipos: [];
  vida: number;
  ataque: number;
  defensa: number;
  velocidad: number;
  altura: number;
  peso: number;
  db?: boolean;
}

export const getAllPokemons = async (req: Request, res: Response) => {
  const { name } = req.query;

  try {
    const API = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40");
    const DATA = API.data.results;

    const promises: Promise<AxiosResponse<any, any>>[] = [];

    DATA.forEach((url: Url) => promises.push(axios.get(url.url)));

    const responses: AxiosResponse<any>[] = await Promise.all(promises);

    const results: any = responses.map(
      (response: any): [PokeFormat] => response.data
    );

    const POKE_API: PokeFormat[] = [];
    for (let i: number = 0; i < results.length; i++) {
      POKE_API.push({
        id: results[i].id,
        nombre: results[i].name,
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

    const POKE_DB = await Pokemon.findAll({ include: [Tipo] });

    const ALL_POKEMONS = [...POKE_API, ...POKE_DB];

    if (name) {
      const filter = ALL_POKEMONS.filter((pokemon) =>
        pokemon.nombre.includes(name)
      );
      return res.status(200).send(filter);
    } else {
      return res.status(200).send(ALL_POKEMONS);
    }
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
};

export const getPokemonDetail = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (id.length <= 10) {
      const API = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const RESULT = API.data;
      const POKE_API_DETAIL: any = {
        id: RESULT.id,
        nombre: RESULT.name,
        imagen: [
          RESULT.sprites.other["official-artwork"]["front_default"],
          RESULT.sprites.other["official-artwork"]["front_shiny"],
        ],
        tipos: RESULT.types.map((tipo: any) => tipo.type.name),
        vida: RESULT.stats[0]["base_stat"],
        ataque: RESULT.stats[1]["base_stat"],
        defensa: RESULT.stats[2]["base_stat"],
        velocidad: RESULT.stats[3]["base_stat"],
        altura: RESULT.height,
        peso: RESULT.weight,
      };
      return res.status(200).send(POKE_API_DETAIL);
    } else {
      const POKE_DB_DETAIL: any = await Pokemon.findByPk(id);
      return res.status(200).send(POKE_DB_DETAIL);
    }
  } catch (error: any) {
    return res.status(400).send({ error: error.message });
  }
};
