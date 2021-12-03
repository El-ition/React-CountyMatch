import { useEffect, useState } from 'react';
import './App.css';
import CountryList from './comp/CountryList';
import { useFetch } from './hooks/useFetch';

function App() {
  const [borderCt, setBorderCt] = useState([]);
  const {
    data: countries,
    isFeching,
    error,
  } = useFetch('https://travelbriefing.org/countries.json');
  // console.log(countries);

  useEffect(() => {
    if (countries) {
      let matualCount = [];
      const findIt = (para) => {
        console.log(para);
        countries.forEach((el) => {
          if (el.neighbors.includes(para.name)) {
            console.log(para.name, el.name);
            if (
              !matualCount.includes([el.name, para.name].join(' and ')) &&
              !matualCount.includes([para.name, el.name].join(' and '))
            ) {
              matualCount.push([para.name, el.name].join(' and '));
            }
          }
        });
      };

      findIt(...countries);
      console.log(matualCount);
      setBorderCt(matualCount);
    }
  }, [countries]);
  return (
    <div className="app">
      <h1>hi there</h1>
      {isFeching && <h2>Loading ...</h2>}
      {error && <h2>{error}</h2>}
      {countries && <CountryList countries={countries} />}
      {borderCt && borderCt.map((el) => <h2 key={el}>{el}</h2>)}
    </div>
  );
}

export default App;
