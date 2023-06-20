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
    <form className='flex flex-col border border-black'>

      <label htmlFor="name-input" className='border border-black'>
        Nome:
        <input
          type="text"
          data-testid="name-input"
          className='border border-black'
          name='cardName'
          onChange={({ target }) => onInputChange(target)}
          value={cardName}
        />
      </label>

      <label htmlFor="description-input" className='border border-black'>
        Descrição:
        <textarea
          data-testid="description-input"
          className='border border-black'
          name="cardDescription"
          onChange={({ target }) => onInputChange(target)}
          value={cardDescription}
        />
      </label>

      <label htmlFor="attr1-input" className='border border-black'>
        Attr01:
        <input
          type="number"
          data-testid="attr1-input"
          className='border border-black'
          name="cardAttr1"
          onChange={({ target }) => onInputChange(target)}
          value={cardAttr1}
          min="0"
          max="90"
        />
      </label>

      <label htmlFor="attr2-input" className='border border-black'>
        Attr02:
        <input
          type="number"
          data-testid="attr2-input"
          className='border border-black'
          name="cardAttr2"
          onChange={({ target }) => onInputChange(target)}
          value={cardAttr2}
          min="0"
          max="90"
        />
      </label>

      <label htmlFor="attr3-input" className='border border-black'>
        Attr03:
        <input
          type="number"
          data-testid="attr3-input"
          className='border border-black'
          name="cardAttr3"
          onChange={({ target }) => onInputChange(target)}
          value={cardAttr3}
          min="0"
          max="90"
        />
      </label>

      <label htmlFor="image-input" className='border border-black'>
        Imagem:
        <input
          type="text"
          data-testid="image-input"
          className='border border-black'
          name="cardImage"
          onChange={({ target }) => onInputChange(target)}
          value={cardImage}
        />
      </label>

      <label htmlFor="rare-input" className='border border-black'>
        Raridade:
        <select
          name="cardRare"
          id=""
          data-testid="rare-input"
          className='border border-black'
          onChange={({ target }) => onInputChange(target)}
          value={cardRare}
        >
          <option value="normal">normal</option>
          <option value="raro">raro</option>
          <option value="muito raro">muito raro</option>
        </select>
      </label>

      {!hasTrunfo && !checkTrunfo ? (
        <label htmlFor="trunfo-input" className='border border-black'>
        Super Trunfo
          <input
            type="checkbox"
            data-testid="trunfo-input"
            className='border border-black'
            name="cardTrunfo"
            onChange={({ target }) => onInputChange(target)}
            checked={cardTrunfo}
          />
        </label>
      ) : <p>Você já tem um Super Trunfo em seu baralho</p>}

      <label htmlFor="save-button" className='border border-black'>
        <button
          type="button"
          data-testid="save-button"
          className={`
            border border-black bg-[#2FC18C] text-white font-bold
            disabled:bg-gray-200 disabled:text-white disabled:font-bold
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
