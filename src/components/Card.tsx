export interface PropsCard {
  cardName: string;
  cardDescription: string;
  cardAttr1: string;
  cardAttr2: string;
  cardAttr3: string;
  cardImage: string;
  cardRare: string;
  cardTrunfo: boolean;
}

export default function card(props: PropsCard) {
  const {
    cardName,
    cardDescription,
    cardAttr1,
    cardAttr2,
    cardAttr3,
    cardImage,
    cardRare,
    cardTrunfo
  } = props;

  return (
    <div className="">

      <p
        data-testid="name-card"
        className="bg-[#023031] font-bold h-10 p-2 rounded-md text-right text-white"
      >
        {cardName}
      </p>

      <img
        src={cardImage}
        alt={cardName}
        data-testid="image-card"
        className="block mx-auto my-1 w-1/2"
      />

      <p
        data-testid="description-card"
        className="bg-black/5 h-20 p-1 text-sm rounded-sm lg:text-base"
      >
        {cardDescription}
      </p>

      <p
        data-testid="attr1-card"
        className="bg-black/5 flex items-center justify-between my-2 rounded-md"
      >
        <span className="p-2">attr1:</span>
        <span className="bg-[#023031] p-2 rounded-r-md text-white">
          {cardAttr1}
        </span>
      </p>

      <p
        data-testid="attr2-card"
        className="bg-black/5 flex items-center justify-between my-2 rounded-md"
      >
        <span className="p-2">attr2:</span>
        <span
          className="bg-[#023031] p-2 rounded-r-md text-white"
        >
          {cardAttr2}
        </span>
      </p>

      <p
        data-testid="attr3-card"
        className="bg-black/5 flex items-center justify-between my-2 rounded-md"
      >
        <span className="p-2">attr3:</span>
        <span
          className="bg-[#023031] p-2 rounded-r-md text-white"
        >
          {cardAttr3}
        </span>
      </p>

      <p
        data-testid="rare-card"
        className="bg-black/5 flex items-center justify-between my-2 rounded-md"
      >
        <span className="p-2">Raridade:</span>
        <span className="font-bold p-2">{cardRare}</span>
      </p>

      {cardTrunfo &&
        <p
          data-testid="trunfo-card"
          className="bg-yellow-500 font-bold my-2 p-2 rounded-md text-center text-white">
          Super Trunfo
        </p>
      }
    </div>
  );
}
