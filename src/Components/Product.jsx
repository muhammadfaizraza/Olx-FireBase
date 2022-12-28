import React from 'react'
import Card from 'react-bootstrap/Card';


const Product = ({data}) => {
  console.log(data)
    return (
    <div className="productSection">
        {
        data.map((item , index)=>(
            <Card  className='productCard' key={index} style={{ width: '15rem' }}>
      <Card.Img variant="top" src={item.url} />
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>
  {item.description}
  <p>{item.price}</p>
        </Card.Text>
      </Card.Body>
    </Card>
))}    </div>
  )
}

export default Product