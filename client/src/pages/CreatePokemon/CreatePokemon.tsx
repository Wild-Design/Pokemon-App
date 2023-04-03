import React, { useEffect } from "react";
import style from "./CreatePokemon.module.css";
import allTypes from "../../utils/imgTypes";
import { useState } from "react";
import { createPokemon } from "../../features/pokemonsSlice";
import { useAppDispatch } from "../../app/hooks";
import CardAlert from "../../components/CardAlert/CardAlert";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const types: string[] = [];
for (let i: number = 0; i < allTypes.length - 2; i++) {
  types.push(allTypes[i].nombre);
}

const CreatePokemon: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  interface Body {
    nombre: string;
    imagen: string | string[];
    vida: string;
    ataque: string;
    defensa: string;
    velocidad: string;
    altura: string;
    peso: string;
    TipoId: string[];
  }
  interface Errors {
    nombre: string;
    imagen: string;
    vida: string;
    ataque: string;
    defensa: string;
    velocidad: string;
    altura: string;
    peso: string;
    TipoId: string;
  }
  interface SubmitEvent extends React.FormEvent<HTMLFormElement> {
    preventDefault: () => void;
  }
  const [body, setBody] = useState<Body>({
    nombre: "",
    imagen: [],
    vida: "",
    ataque: "",
    defensa: "",
    velocidad: "",
    altura: "",
    peso: "",
    TipoId: [],
  });

  const [error, setError] = useState<Errors>({
    nombre: "",
    imagen: "",
    vida: "",
    ataque: "",
    defensa: "",
    velocidad: "",
    altura: "",
    peso: "",
    TipoId: "",
  });

  const [created, setCreated] = useState(false);

  const VALIDATOR = (event: React.FocusEvent<HTMLInputElement>) => {
    const PROPERTY = event.target.name;
    if (PROPERTY === "nombre") {
      !body.nombre.length
        ? setError({ ...error, nombre: "Falta completar" })
        : body.nombre.length >= 21
        ? setError({ ...error, nombre: "Maximo 20 caracteres" })
        : setError({ ...error, nombre: "" });
    }
    if (PROPERTY === "imagen") {
      !body.imagen.length
        ? setError({ ...error, imagen: "Falta completar" })
        : setError({ ...error, imagen: "" });
    }
    if (PROPERTY === "vida") {
      !body.vida.length
        ? setError({ ...error, vida: "Falta completar" })
        : parseInt(body.vida) <= 0
        ? setError({ ...error, vida: "Minimo 1" })
        : parseInt(body.vida) >= 256
        ? setError({ ...error, vida: "Maximo 250" })
        : setError({ ...error, vida: "" });
    }
    if (PROPERTY === "ataque") {
      !body.ataque.length
        ? setError({ ...error, ataque: "Falta completar" })
        : parseInt(body.ataque) <= 0
        ? setError({ ...error, ataque: "Minimo 1" })
        : parseInt(body.ataque) >= 256
        ? setError({ ...error, ataque: "Maximo 250" })
        : setError({ ...error, ataque: "" });
    }
    if (PROPERTY === "defensa") {
      !body.defensa.length
        ? setError({ ...error, defensa: "Falta completar" })
        : parseInt(body.defensa) <= 0
        ? setError({ ...error, defensa: "Minimo 1" })
        : parseInt(body.defensa) >= 256
        ? setError({ ...error, defensa: "Maximo 250" })
        : setError({ ...error, defensa: "" });
    }
    if (PROPERTY === "velocidad") {
      !body.velocidad.length
        ? setError({ ...error, velocidad: "Falta completar" })
        : parseInt(body.velocidad) <= 0
        ? setError({ ...error, velocidad: "Minimo 1" })
        : parseInt(body.velocidad) >= 256
        ? setError({ ...error, velocidad: "Maximo 250" })
        : setError({ ...error, velocidad: "" });
    }
    if (PROPERTY === "altura") {
      !body.altura.length
        ? setError({ ...error, altura: "Falta completar" })
        : setError({ ...error, altura: "" });
    }
    if (PROPERTY === "peso") {
      !body.peso.length
        ? setError({ ...error, peso: "Falta completar" })
        : setError({ ...error, peso: "" });
    }
  };

  const handleType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;
    if (checked) {
      setBody({ ...body, TipoId: [...body.TipoId].concat(name) });
    } else {
      setBody({
        ...body,
        TipoId: [...body.TipoId].filter((types: string) => types !== name),
      });
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    name === "imagen"
      ? setBody({ ...body, imagen: [value] })
      : setBody({ ...body, [name]: value });
  };

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
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
    }: Body = body;
    if (
      nombre &&
      imagen.length &&
      vida &&
      ataque &&
      defensa &&
      velocidad &&
      altura &&
      peso &&
      TipoId.length
    ) {
      const create = await dispatch(createPokemon(body));
      if (create) {
        let timerInterval: any;
        Swal.fire({
          title: "Pokemon creado correctamente 😁",
          html: "Redireccionando al Home.",
          timer: 5000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const b: any = Swal.getHtmlContainer()?.querySelector("b");
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft();
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            navigate("/home");
          }
        });
      } else {
        let timerInterval: any;
        Swal.fire({
          title: "⛔Error, no se pudo crear el Pokemon, intenta mas tarde!⛔",
          html: "Redireccionando al Home.",
          timer: 5000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const b: any = Swal.getHtmlContainer()?.querySelector("b");
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft();
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            navigate("/home");
          }
        });
      }
    } else {
      Swal.fire(
        "¡Debes completar todos los campos del formulario antes de continuar!"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardAlert />
      <label htmlFor='nombre'>
        Nombre
        <input
          onChange={(event) => handleInputChange(event)}
          onBlur={(event) => VALIDATOR(event)}
          type='text'
          name='nombre'
          id='nombre'
        />
        <p className={error.nombre && style.error}>{error.nombre}</p>
      </label>
      <label htmlFor='imagen'>
        Imagen
        <input
          onChange={(event) => handleInputChange(event)}
          onBlur={(event) => VALIDATOR(event)}
          type='text'
          name='imagen'
          id='imagen'
        />
        <p className={error.imagen && style.error}>{error.imagen}</p>
      </label>
      <label htmlFor='vida'>
        Vida
        <input
          onChange={(event) => handleInputChange(event)}
          onBlur={(event) => VALIDATOR(event)}
          type='number'
          name='vida'
          id='vida'
          min={0}
          max={250}
        />
        <p className={error.vida && style.error}>{error.vida}</p>
      </label>
      <label htmlFor='ataque'>
        Ataque
        <input
          onChange={(event) => handleInputChange(event)}
          onBlur={(event) => VALIDATOR(event)}
          type='number'
          name='ataque'
          id='ataque'
          min={0}
          max={250}
        />
        <p className={error.ataque && style.error}>{error.ataque}</p>
      </label>
      <label htmlFor='defensa'>
        Defensa
        <input
          onChange={(event) => handleInputChange(event)}
          onBlur={(event) => VALIDATOR(event)}
          type='number'
          name='defensa'
          id='defensa'
          min={0}
          max={250}
        />
        <p className={error.defensa && style.error}>{error.defensa}</p>
      </label>
      <label htmlFor='velocidad'>
        Velocidad
        <input
          onChange={(event) => handleInputChange(event)}
          onBlur={(event) => VALIDATOR(event)}
          type='number'
          name='velocidad'
          id='velocidad'
          min={0}
          max={250}
        />
        <p className={error.velocidad && style.error}>{error.velocidad}</p>
        <label htmlFor='altura'>
          Altura
          <input
            onChange={(event) => handleInputChange(event)}
            onBlur={(event) => VALIDATOR(event)}
            type='number'
            name='altura'
            id='altura'
            min={0}
            max={100}
          />
          <p className={error.altura && style.error}>{error.altura}</p>
        </label>
        <label htmlFor='peso'>
          Peso
          <input
            onChange={(event) => handleInputChange(event)}
            onBlur={(event) => VALIDATOR(event)}
            type='number'
            name='peso'
            id='peso'
            min={0}
            max={50000}
          />
          <p className={error.peso && style.error}>{error.peso}</p>
        </label>
      </label>
      <>
        {types.map((type: string) => {
          return (
            <div key={type}>
              <label htmlFor={type}>
                {type}
                <input
                  onChange={handleType}
                  type='checkbox'
                  name={type}
                  id={type}
                />
              </label>
            </div>
          );
        })}
        <p className={error.TipoId ? style.error : style.okay}>
          {error.TipoId}
        </p>
      </>
      <button type='submit'>Crear</button>
    </form>
  );
};

export default CreatePokemon;
