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
  imagen?: [string, string];
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
    const API = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=50");
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

    const POKE_DB = await Pokemon.findAll({ include: { model: Tipo } });

    const POKE_FILTER = POKE_DB.map((pokemon: any) => {
      return {
        id: pokemon.id,
        nombre: pokemon.nombre,
        imagen: pokemon.imagen,
        tipos: pokemon.Tipos.length
          ? pokemon.Tipos.map((tipo: any) => tipo.nombre)
          : pokemon.Tipos,
        vida: pokemon.vida,
        ataque: pokemon.ataque,
        defensa: pokemon.defensa,
        velocidad: pokemon.velocidad,
        altura: pokemon.altura,
        peso: pokemon.peso,
        db: pokemon.db,
      };
    });

    const ALL_POKEMONS = [...POKE_API, ...POKE_FILTER];

    if (name) {
      //...............................................................................
      try {
        const POKE_API = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        const POKES = POKE_API.data;

        const RESULTS = [POKES].map((poke: any): PokeFormat => {
          return {
            id: poke.id,
            nombre: poke.name,
            imagen: [
              poke.sprites.other["official-artwork"]["front_default"],
              poke.sprites.other["official-artwork"]["front_shiny"],
            ],
            tipos: poke.types.map((tipo: any) => tipo.type.name),
            vida: poke.stats[0]["base_stat"],
            ataque: poke.stats[1]["base_stat"],
            defensa: poke.stats[2]["base_stat"],
            velocidad: poke.stats[3]["base_stat"],
            altura: poke.height,
            peso: poke.weight,
          };
        });

        return res.status(200).send(RESULTS);
      } catch (error: any) {
        if (error) {
          const DB = await Pokemon.findAll({ include: { model: Tipo } });
          const filter = DB.filter((pokemon: any) =>
            pokemon.nombre.includes(name)
          );

          const RESULTS = filter.map((poke: any): PokeFormat => {
            return {
              id: poke.id,
              nombre: poke.nombre,
              imagen: poke.imagen,
              tipos: poke.Tipos.map((tipo: any) => tipo.nombre),
              vida: poke.vida,
              ataque: poke.ataque,
              defensa: poke.defensa,
              velocidad: poke.velocidad,
              altura: poke.altura,
              peso: poke.peso,
              db: poke.db,
            };
          });

          return res.status(200).send(RESULTS);
        }
      }
      //...............................................................................
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
      const POKE_API_DETAIL: PokeFormat = {
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
      const POKE_DB_DETAIL: any = await Pokemon.findByPk(id, {
        include: { model: Tipo },
      });

      let newObj: PokeFormat = {
        id: POKE_DB_DETAIL.id,
        nombre: POKE_DB_DETAIL.nombre,
        imagen: POKE_DB_DETAIL.imagen,
        tipos: POKE_DB_DETAIL.Tipos.length
          ? POKE_DB_DETAIL.Tipos.map((tipo: any) => tipo.nombre)
          : POKE_DB_DETAIL.Tipos,
        vida: POKE_DB_DETAIL.vida,
        ataque: POKE_DB_DETAIL.ataque,
        defensa: POKE_DB_DETAIL.defensa,
        velocidad: POKE_DB_DETAIL.velocidad,
        altura: POKE_DB_DETAIL.altura,
        peso: POKE_DB_DETAIL.peso,
        db: POKE_DB_DETAIL.db,
      };

      return res.status(200).send(newObj);
    }
  } catch (error: any) {
    return res.status(404).send({ error: error.message });
  }
};

export const postPokemon = async (req: Request, res: Response) => {
  const {
    nombre,
    imagen,
    vida,
    ataque,
    defensa,
    velocidad,
    altura,
    peso,
    TipoId,
  } = req.body;
  if (
    !nombre ||
    !vida ||
    !ataque ||
    !defensa ||
    !velocidad ||
    !altura ||
    !peso
  ) {
    return res
      .status(404)
      .send(
        "¡Faltan datos obligatórios!, el objeto de creacion debe cumplir con las propiedades: (TipoId,nombre,imagen,vida,ataque,defensa,velocidad,altura,peso)"
      );
  } else {
    try {
      const CREATE_POKEMON = await Pokemon.create({
        nombre,
        imagen,
        vida,
        ataque,
        defensa,
        velocidad,
        altura,
        peso,
        TipoId,
      });
      await CREATE_POKEMON.addTipo(TipoId);
      return res.send(CREATE_POKEMON);
    } catch (error: any) {
      return res.status(404).send({ error: error.message });
    }
  }
};
