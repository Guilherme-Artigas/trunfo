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
    <div>
      <p data-testid="name-card">{cardName}</p>
      <img
        src={cardImage}
        alt={cardName}
        data-testid="image-card"
        height={200}
        width={200}
      />
      <p data-testid="description-card">{cardDescription}</p>
      <p data-testid="attr1-card">{cardAttr1}</p>
      <p data-testid="attr2-card">{cardAttr2}</p>
      <p data-testid="attr3-card">{cardAttr3}</p>
      <p data-testid="rare-card">{cardRare}</p>
      {cardTrunfo && <p data-testid="trunfo-card">Super Trunfo</p>}
    </div>
  );
}
