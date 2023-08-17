import { useEffect, useState } from "react";

function avisarAPI() {
  console.log("Lista salva com sucesso");
}

export function App() {
  const [list, setList] = useState<string[]>([]);
  const [filter, setFilter] = useState("");

  const filteredList = list.filter((item) => item.includes(filter));

  useEffect(() => {
    console.log(list);
    avisarAPI;
  }, [list]); //toda Vez q a varialvel List mudar, ele vai passar a função avisarAPI

  useEffect(() => {
    fetch("https://api.github.com/users/matheuslima44/repos")
      .then((response) => response.json())
      .then((data) => {
        setList(data.map((item: any) => item.full_name));
      });
  }, []); //Caso não seja passado nada no array de dependencias, ele executa em apenas um momento(quando o componente aparecer em tela)

  function addToList() {
    setList((state) => [...state, "novo item"]);
  }

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
      />

      <ul>
        {list.map((item) => (
          <li>{item}</li>
        ))}
      </ul>

      <ul>
        {filteredList.map((item) => (
          <li>{item}</li>
        ))}
      </ul>

      <button onClick={addToList}>Add to list</button>
    </div>
  );
}

//Hooks:

//useState -> armazenar variaveis que quando tem seu valor alterado, provocam uma nova renderização no componente

//useEffect -> Side-effect -> Efeito Colateral, acontece por alguma ação anterior

//Porque usar o useEffect ? pois com ele posso usar quais variaveis queremos monitorar

//Dica: Dificilmente utiliza o useEffect, para atualizar o estado!
//Se o useEffect precisa atualizar o estado de forma assincrona, provavelmente estamos cometendo algum erro!
