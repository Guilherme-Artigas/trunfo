import { useEffect, useState } from 'react';
import Card from '@/components/Card';
import Form from '@/components/Form';
import Head from 'next/head';
import Image from 'next/image';
import logo from '../../public/logo_tryunfo.svg';
import { validateForm } from '../utils/validateForm';

export default function Home() {
  const [card, setCard] = useState({
    cardName: '',
    cardDescription: '',
    cardAttr1: '0',
    cardAttr2: '0',
    cardAttr3: '0',
    cardImage: '',
    cardRare: 'normal',
    cardTrunfo: false
  });

  const [isSaveButtonDisabled, setButton] = useState(true);
  const [hasTrunfo, setHasTrunfo] = useState(Boolean);
  const [cardsList, setCardsList] = useState([]);
  const [showCards, setShowCards] = useState(false);

  const {
    cardName,
    cardDescription,
    cardAttr1,
    cardAttr2,
    cardAttr3,
    cardImage,
    cardRare,
    cardTrunfo
  } = card;

  useEffect(() => {
    const recovery = localStorage.getItem('cardsList') || [];
    if (recovery.length > 0) setCardsList(JSON.parse(recovery as string));
  }, []);

  useEffect(() => validateForm(card) ? setButton(false) : setButton(true), [card]);

  function onInputChange(target: any): void {
    const { name } = target;
    const value = target.type !== 'checkbox' ? target.value : target.checked;
    setCard({ ...card, [name]: value });

    return;
  }

  function onSaveButtonClick(): void {
    if (cardTrunfo) setHasTrunfo(true);

    const newListCards = cardsList.concat({ ...card } as any);
    setCardsList(newListCards);
    localStorage.setItem('cardsList', JSON.stringify(newListCards));

    setCard({
      cardTrunfo: false,
      cardName: '',
      cardDescription: '',
      cardImage: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardRare: 'normal'
    });

    return;
  }

  function deleteCards(cardIndex: number): void {
    const filteredCardList = cardsList.filter((_, i) => cardIndex !== i);
    if (!filteredCardList.some(({ cardTrunfo }) => cardTrunfo === true)) setHasTrunfo(false);
    setCardsList(filteredCardList);
    localStorage.setItem('cardsList', JSON.stringify(filteredCardList));
  }

  function searchCardByName(name: string): void {
    if (name === '') {
      const recoveryList = JSON.parse(localStorage.getItem('cardsList') as string);
      setCardsList(recoveryList);
    } else {
      const filteredList = cardsList.filter((c: any) =>
        c.cardName.toLowerCase().includes(name.toLowerCase())
      );
      setCardsList(filteredList);
    }
  }

  function searchByRarity(rarity: string): void {
    const recoveryList = JSON.parse(localStorage.getItem('cardsList') as string);
    setCardsList(recoveryList);

    if (rarity === 'normal') {
      const allCardsNormal = recoveryList.filter((c: any) => c.cardRare === 'normal');
      setCardsList(allCardsNormal);

      return;
    }

    if (rarity === 'raro') {
      const allCardsRare = recoveryList.filter((c: any) => c.cardRare === 'raro');
      setCardsList(allCardsRare);

      return;
    }

    if (rarity === 'muito raro') {
      const allCardsVeryRare = recoveryList.filter((c: any) => c.cardRare === 'muito raro');
      setCardsList(allCardsVeryRare);

      return;
    }

    setCardsList(recoveryList);

    return;
  }

  function searchByTrunfo(checked: boolean): void {
    const recoveryList = JSON.parse(localStorage.getItem('cardsList') as string);
    const cardTrunfoFound = recoveryList.some((c: any) => c.cardTrunfo === true);

    if (checked && cardTrunfoFound) {
      const filteredCardList = recoveryList.filter((c: any) => c.cardTrunfo === true);
      setCardsList(filteredCardList);

      return;
    }

    setCardsList(recoveryList);

    return;
  }

  return (
    <>
      <Head>
        <title>Trunfo</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <header className="flex justify-center my-10">
        <Image src={logo} alt="Logo do Card Game Trunfo" className="w-1/2 md:w-1/3" />
      </header>
      <div className="p-1 w-11/12 mx-auto">

        <section className="bg-white md:flex md:justify-around rounded-xl p-2">
          <Form
            cardName={cardName}
            cardDescription={cardDescription}
            cardAttr1={cardAttr1}
            cardAttr2={cardAttr2}
            cardAttr3={cardAttr3}
            cardImage={cardImage}
            cardRare={cardRare}
            cardTrunfo={cardTrunfo}
            hasTrunfo={hasTrunfo}
            isSaveButtonDisabled={isSaveButtonDisabled}
            onInputChange={onInputChange}
            onSaveButtonClick={onSaveButtonClick}
          />

          <div className="md:w-1/2 md:p-2">
            <h2 className="font-bold my-2 text-center text-[#2FC18C]">Pré visualização</h2>

            <Card
              cardName={cardName}
              cardDescription={cardDescription}
              cardAttr1={cardAttr1}
              cardAttr2={cardAttr2}
              cardAttr3={cardAttr3}
              cardImage={cardImage}
              cardRare={cardRare}
              cardTrunfo={cardTrunfo}
            />
          </div>
        </section>

        <button
          type="button"
          onClick={() => setShowCards(!showCards)}
          className="bg-[#2FC18C] block font-bold my-10 mx-auto p-2 rounded-md text-white w-1/2"
        >
          Mostrar Cartas
        </button>

        {showCards && (
          <>
            <form className="bg-white my-4 p-1 rounded-md">
              <h4 className="my-2 text-center">Filtros de busca: </h4>

              <label htmlFor="searchName">
                <input type="text"
                  placeholder="Busca por nome"
                  className="border border-[#2FC18C] my-1 p-1 rounded-md text-center w-full"
                  name="searchName"
                  onChange={({ target: { value } }) => searchCardByName(value)}
                />
              </label>

              <label htmlFor="searchRarity">
                <select
                  name="searchRarity"
                  className="border border-[#2FC18C] my-1 p-1 rounded-md text-center w-full"
                  onChange={({ target: { value } }) => searchByRarity(value)}
                >
                  <option value="todas">todas</option>
                  <option value="normal">normal</option>
                  <option value="raro">raro</option>
                  <option value="muito raro">muito raro</option>
                </select>
              </label>

              <label
                htmlFor="searchTrunfo"
                className="border border-[#2FC18C] flex items-center justify-center rounded-md p-1"
              >
                <span>Buscar Super Trunfo</span>
                <input
                  type="checkbox"
                  name="searchTrunfo"
                  className="accent-[#023031] mx-5"
                  onChange={({ target: { checked } }) => searchByTrunfo(checked)}
                />
              </label>
            </form>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {cardsList.length > 0 && (
                cardsList.map((c: any, index: number) => (
                  <li
                    key={`${c.cardName}-${index}`}
                    className={`
                    bg-white border-8 border-[#036B52] flex flex-col justify-between p-1 rounded-md
                    `}
                  >
                    <Card
                      cardName={c.cardName}
                      cardDescription={c.cardDescription}
                      cardAttr1={c.cardAttr1}
                      cardAttr2={c.cardAttr2}
                      cardAttr3={c.cardAttr3}
                      cardImage={c.cardImage}
                      cardRare={c.cardRare}
                      cardTrunfo={c.cardTrunfo}
                    />
                    <button
                      type="button"
                      className="block bg-[#2FC18C] font-bold rounded-sm p-1 text-white w-full"
                      onClick={() => deleteCards(index)}
                    >
                      Excluir
                    </button>
                  </li>)
                )
              )}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
