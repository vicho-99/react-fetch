import { useEffect, useState } from "react";
import './index.css'

const currencyOption = [
  "dolar",
  "euro",
  "uf",
  "bitcoin",
  /* "ivp",
  "dolar_intercambio",
  "ipc",
  "utm",
  "imacec",
  "tpm",
  "libra_cobre",
  "tasa_desempleo", */
]

const URL = 'https://mindicador.cl/api'

function App() {

  const [data, setData] = useState([]);

  const [currency, setCurrency] = useState(["dolar", "euro"])

  useEffect(() => {

    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })

  }, [])

  async function onChangeCheck(value) {

    let newData = [...currency]

    if (currency.includes(value))
      newData.splice(currency.findIndex(e => e === value), 1)
    else
      newData.push(value)

    setCurrency(newData)

  }

  return (

    <section className="container mx-auto p-6 text-white" >

      <div className="flex flex-row gap-6 bg-slate-800  p-3 rounded-lg" >

        {currencyOption.map((value, index) => (

          <div key={value} className="flex  gap-2" >

            <input
              className="cursor-pointer"
              type="checkbox"
              onChange={() => onChangeCheck(value, index)}
              checked={currency.includes(value)}
            />

            <label className="text-xl font-bold" >
              {value}
            </label >

          </div>

        ))}

      </div>

      <div className="grid grid-cols-2 gap-3 mt-5 text-center " >

        {currency.map(c => (

          <div key={c} className="col-span-1">

            <div className="flex flex-col gap-1.5 bg-slate-800  p-3 rounded-lg" >

              <h1 className="text-2xl" >{data[c]?.codigo}</h1>
              <h2 className="text-1xl" >{data[c]?.nombre}</h2>
              <p className="font-extrabold text-2xl" >{data[c]?.valor}</p>

            </div>

          </div>

        ))}

      </div>

    </section>

  );
}

export default App;
