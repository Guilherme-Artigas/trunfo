import { useEffect, useState } from 'react';

export interface PropsForm {
  cardName: string;
  cardDescription: string;
  cardAttr1: string;
  cardAttr2: string;
  cardAttr3: string;
  cardImage: string;
  cardRare: string;
  cardTrunfo: boolean;
  hasTrunfo: boolean;
  isSaveButtonDisabled: boolean;
  onInputChange: (target: any) => void;
  onSaveButtonClick: (target: any) => void;
}

export default function Form(props: PropsForm) {
  const [checkTrunfo, setCheckTrunfo] = useState(false);

  const {
    cardName,
    cardDescription,
    cardAttr1,
    cardAttr2,
    cardAttr3,
    cardImage,
    cardRare,
    cardTrunfo,
    hasTrunfo,
    isSaveButtonDisabled,
    onInputChange,
    onSaveButtonClick
  } = props;

  useEffect(() => {
    const recovery = localStorage.getItem('cardsList') || [];
    if (recovery.length > 0) {
      const cardsList = JSON.parse(recovery as string);
      if (cardsList.some(({ cardTrunfo }: any) => cardTrunfo === true)) setCheckTrunfo(true);
    }
  }, []);

  return (
    <form className="flex flex-col md:justify-around md:p-8 md:w-1/2">

      <h1 className="font-bold my-2 text-center text-[#2FC18C]">
        ADICIONE NOVA CARTA
      </h1>

      <label htmlFor="name-input" className="p-1">
        <span>Nome:</span>
        <br />
        <input
          type="text"
          data-testid="name-input"
          className="border-b border-black w-full"
          name='cardName'
          onChange={({ target }) => onInputChange(target)}
          value={cardName}
        />
      </label>

      <label htmlFor="description-input" className="p-1">
        <span>Descrição:</span>
        <br />
        <textarea
          data-testid="description-input"
          className="border-b border-black w-full"
          name="cardDescription"
          onChange={({ target }) => onInputChange(target)}
          value={cardDescription}
        />
      </label>

      <label htmlFor="attr1-input" className="flex items-center justify-end p-2">
        <span>Attr01:</span>
        <input
          type="text"
          data-testid="attr1-input"
          className="border border-black mx-2 rounded-md text-center w-16"
          name="cardAttr1"
          onChange={({ target }) => onInputChange(target)}
          value={cardAttr1}
        />
      </label>

      <label htmlFor="attr2-input" className="flex items-center justify-end p-2">
        <span>Attr02:</span>
        <input
          type="text"
          data-testid="attr2-input"
          className="border border-black mx-2 rounded-md text-center w-16"
          name="cardAttr2"
          onChange={({ target }) => onInputChange(target)}
          value={cardAttr2}
        />
      </label>

      <label htmlFor="attr3-input" className="flex items-center justify-end p-2">
        <span>Attr03:</span>
        <input
          type="text"
          data-testid="attr3-input"
          className="border border-black mx-2 rounded-md text-center w-16"
          name="cardAttr3"
          onChange={({ target }) => onInputChange(target)}
          value={cardAttr3}
        />
      </label>

      <label htmlFor="image-input" className="p-1">
        <span>URL - Imagem:</span>
        <br />
        <input
          type="text"
          data-testid="image-input"
          className="border-b border-black w-full"
          name="cardImage"
          onChange={({ target }) => onInputChange(target)}
          value={cardImage}
        />
      </label>

      <label htmlFor="rare-input" className="p-2">
        <span>Raridade:</span>
        <select
          name="cardRare"
          id=""
          data-testid="rare-input"
          className="bg-white border-b border-black mx-4 text-center p-1"
          onChange={({ target }) => onInputChange(target)}
          value={cardRare}
        >
          <option value="normal">normal</option>
          <option value="raro">raro</option>
          <option value="muito raro">muito raro</option>
        </select>
      </label>

      {!hasTrunfo && !checkTrunfo ? (
        <label htmlFor="trunfo-input" className="flex items-center justify-center p-2">
          <span>Super Trunfo</span>
          <input
            type="checkbox"
            data-testid="trunfo-input"
            className="accent-[#023031] mx-10 my-4"
            name="cardTrunfo"
            onChange={({ target }) => onInputChange(target)}
            checked={cardTrunfo}
          />
        </label>
      ) :
        <p className="my-4 text-red-600 text-center">
          Você já tem um Super Trunfo em seu baralho
        </p>
      }

      <label htmlFor="save-button" className="p-2">
        <button
          type="button"
          data-testid="save-button"
          className={`
            bg-[#2FC18C] text-white font-bold
            disabled:bg-gray-200 disabled:text-white disabled:font-bold
            p-2 w-full rounded-md
          `}
          disabled={isSaveButtonDisabled}
          onClick={onSaveButtonClick}
        >
          Salvar
        </button>
      </label>

    </form>
  );
}
