import axios from "axios";
import { Request, Response } from "express";
import { AxiosResponse } from "axios";
import db from "../db";
const { Tipo } = db;

const getAllTypes = async (req: Request, res: Response) => {
  try {
    const TYPES_DB = await Tipo.findAll();
    if (TYPES_DB.length) {
      return res.status(200).send(TYPES_DB);
    } else {
      const API: any = await axios.get("https://pokeapi.co/api/v2/type");

      const API_TYPES = API.data.results.map((type: any) => {
        return { nombre: type.name };
      });

      await Tipo.bulkCreate(API_TYPES);
      const TYPES_DB = await Tipo.findAll();
      return res.status(200).send(TYPES_DB);
    }
  } catch (error: any) {
    return res.status(404).send({ error: error.message });
  }

  // const TYPES = [
  //   {
  //     nombre: "normal",
  //     imagen:
  //       "https://static.wikia.nocookie.net/pokemongo_es_gamepedia/images/4/43/Icon_Normal.png/revision/latest?cb=20220331181122",
  //   },
  //   {
  //     nombre: "fighting",
  //     imagen:
  //       "https://static.wikia.nocookie.net/pokemongo_es_gamepedia/images/4/4c/Icon_Lucha.png/revision/latest?cb=20220331181227",
  //   },
  //   {
  //     nombre: "flyshing",
  //     imagen:
  //       "https://static.wikia.nocookie.net/pokemongo_es_gamepedia/images/d/d3/Icon_Volador.png/revision/latest?cb=20220331181207",
  //   },
  //   {
  //     nombre: "poison",
  //     imagen:
  //       "https://static.wikia.nocookie.net/pokemongo_es_gamepedia/images/3/3e/Icon_Veneno.png/revision/latest?cb=20220331181112",
  //   },
  //   {
  //     nombre: "ground",
  //     imagen:
  //       "https://static.wikia.nocookie.net/pokemongo_es_gamepedia/images/8/8d/Icon_Tierra.png/revision/latest?cb=20220331181140",
  //   },
  //   {
  //     nombre: "rock",
  //     imagen:
  //       "https://static.wikia.nocookie.net/pokemongo_es_gamepedia/images/1/12/Icon_Roca.png/revision/latest?cb=20220331181056",
  //   },
  //   {
  //     nombre: "bug",
  //     imagen:
  //       "https://static.wikia.nocookie.net/pokemongo_es_gamepedia/images/7/7e/Icon_Bicho.png/revision/latest?cb=20220331202325",
  //   },
  //   {
  //     nombre: "ghost",
  //     imagen:
  //       "https://static.wikia.nocookie.net/pokemongo_es_gamepedia/images/9/9a/Icon_Fantasma.png/revision/latest?cb=20220331181158",
  //   },
  //   {
  //     nombre: "steel",
  //     imagen:
  //       "https://static.wikia.nocookie.net/pokemongo_es_gamepedia/images/b/bc/Icon_Acero.png/revision/latest?cb=20220331181046",
  //   },
  //   {
  //     nombre: "fire",
  //     imagen: "https://static.wikia.nocookie.net/pokemongo_es_gamepedia/images/4/44/Icon_Fuego.png/revision/latest?cb=20220331181217",
  //   },
  //   {
  //     nombre: "water",
  //     imagen: "https://static.wikia.nocookie.net/pokemongo_es_gamepedia/images/d/d3/Icon_Agua.png/revision/latest?cb=20220331181037",
  //   },
  //   {
  //     nombre: "grass",
  //     imagen: "https://static.wikia.nocookie.net/pokemongo_es_gamepedia/images/7/7f/Icon_Planta.png/revision/latest?cb=20220331181149",
  //   },
  //   {
  //     nombre: "electric",
  //     imagen: "https://static.wikia.nocookie.net/pokemongo_es_gamepedia/images/3/33/Icon_El%C3%A9ctrico.png/revision/latest?cb=20220331181243",
  //   },
  //   {
  //     nombre: "psychic",
  //     imagen: "https://static.wikia.nocookie.net/pokemongo_es_gamepedia/images/c/c0/Icon_Ps%C3%ADquico.png/revision/latest?cb=20220331181104",
  //   },
  //   {
  //     nombre: "ice",
  //     imagen: "https://static.wikia.nocookie.net/pokemongo_es_gamepedia/images/2/22/Icon_Hielo.png/revision/latest?cb=20220331181131",
  //   },
  //   {
  //     nombre: "dragon",
  //     imagen: "https://static.wikia.nocookie.net/pokemongo_es_gamepedia/images/9/96/Icon_Drag%C3%B3n.png/revision/latest?cb=20220331181251",
  //   },
  //   {
  //     nombre: "dark",
  //     imagen: "https://static.wikia.nocookie.net/pokemongo_es_gamepedia/images/a/a4/Icon_Siniestro.png/revision/latest?cb=20220331181300",
  //   },
  //   {
  //     nombre: "fairy",
  //     imagen: "https://static.wikia.nocookie.net/pokemongo_es_gamepedia/images/6/60/Icon_Hada.png/revision/latest?cb=20220331181235",
  //   },
  //   {
  //     nombre: "unknown",
  //     imagen: "",
  //   },
  //   {
  //     nombre: "shadow",
  //     imagen: "",
  //   },
  // ];
};

export default getAllTypes;
