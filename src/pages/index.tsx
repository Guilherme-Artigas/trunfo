import { useEffect, useState } from 'react';
import Card from '@/components/Card';
import Form from '@/components/Form';
import Head from 'next/head';
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

  function onInputChange(target: any) {
    const { name } = target;
    const value = target.type !== 'checkbox' ? target.value : target.checked;
    setCard({ ...card, [name]: value });

    return;
  }

  function onSaveButtonClick() {
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

  function deleteCards(cardIndex: number) {
    const filteredCardList = cardsList.filter((_, i) => cardIndex !== i);
    if (!filteredCardList.some(({ cardTrunfo }) => cardTrunfo === true)) setHasTrunfo(false);
    setCardsList(filteredCardList);
    localStorage.setItem('cardsList', JSON.stringify(filteredCardList));
  }

  return (
    <div>
      <Head>
        <title>Trunfo</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
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

      <h2>Pré visualização</h2>

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

      <button
        type="button"
        onClick={() => setShowCards(!showCards)}
        className="border border-black"
      >
        Mostrar Cartas
      </button>

      {showCards && (
        <ul>
          {cardsList.length > 0 && (
            cardsList.map((c: any, index: number) => (
              <li
                key={`${c.cardName}-${index}`}
                className="border border-black m-1 p-1"
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
                  className="border border-black"
                  onClick={() => deleteCards(index)}
                >
                  Excluir
                </button>
              </li>)
            )
          )}
        </ul>
      )}

    </div>
  );
}
