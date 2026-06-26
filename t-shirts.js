const tshirts = [
  {
    title: 'Blue T-Shirt',
    image: 'blue-t-shirt.jpg',
    price: 7.99,
    stock: 4,
    quantity: 1
  },
  {
    title: 'Bright Purple T-Shirt',
    image: 'bright-purple-t-shirt.jpg',
    price: 5.99,
    stock: 1,
    quantity: 1
  },
  {
    title: 'Cobalt Blue T-Shirt',
    image: 'cobalt-blue-t-shirt.jpg',
    price: 9.99,
    stock: 5,
    quantity: 1
  },
  {
    title: 'Green T-Shirt',
    image: 'green-t-shirt.jpg',
    price: 6.99,
    stock: 0,
    quantity: 1
  },
  {
    title: 'Grey T-Shirt',
    image: 'grey-t-shirt.jpg',
    price: 4.99,
    stock: 2,
    quantity: 1
  },
  {
    title: 'Light Green T-Shirt',
    image: 'light-green-t-shirt.jpg',
    price: 7.99,
    stock: 4,
    quantity: 1
  },
  {
    title: 'Purple T-Shirt',
    image: 'purple-t-shirt.jpg',
    price: 7.99,
    stock: 0,
    quantity: 1
  },
  {
    title: 'Red T-Shirt',
    image: 'red-t-shirt.jpg',
    price: 6.99,
    stock: 3,
    quantity: 1
  },
  {
    title: 'Teal T-Shirt',
    image: 'teal-t-shirt.jpg',
    price: 7.99,
    stock: 2,
    quantity: 1
  }
]

function TShirt (props) {
  const shirt = props.shirt
  const onQuantityChange = props.onQuantityChange
  const onBuy = props.onBuy

  function quantityHandler (e) {
    onQuantityChange(shirt, e.target.value)
  }

  function buyHandler () {
    onBuy(shirt)
  }

  const options = []

  for (let i = 1; i <= shirt.stock; i++) {
    options.push(
      <option value={i} key={i}>{i}</option>
    )
  }

  return (
    <div className="shirt">
      <h2>{shirt.title}</h2>

      <img src={'images/' + shirt.image} alt={shirt.title} />

      <p>${shirt.price}</p>

      {
        shirt.stock === 0
          ? <p className="stock">Out of Stock</p>
          : (
            <div>
              <p className="stock">Stock: {shirt.stock}</p>

              <select value={shirt.quantity} onChange={quantityHandler}>
                {options}
              </select>

              <button onClick={buyHandler}>Buy</button>
            </div>
          )
      }
    </div>
  )
}

function App () {
  const [shirts, setShirts] = React.useState(() =>
    JSON.parse(localStorage.getItem('shirts')) || tshirts
  )

  function quantityChangeHandler (shirt, quantity) {
    setShirts((prevState) => {
      return prevState.map((item) => {
        if (item.title === shirt.title) {
          return {
            title: item.title,
            image: item.image,
            price: item.price,
            stock: item.stock,
            quantity: parseInt(quantity)
          }
        } else {
          return item
        }
      })
    })
  }

  function buyHandler (shirt) {
    setShirts((prevState) => {
      return prevState.map((item) => {
        if (item.title === shirt.title) {
          return {
            title: item.title,
            image: item.image,
            price: item.price,
            stock: item.stock - item.quantity,
            quantity: 1
          }
        } else {
          return item
        }
      })
    })
  }

  React.useEffect(() => {
    localStorage.setItem('shirts', JSON.stringify(shirts))
  }, [shirts])

  const shirtList = shirts.map((shirt) => {
    return (
      <TShirt
        key={shirt.title}
        shirt={shirt}
        onQuantityChange={quantityChangeHandler}
        onBuy={buyHandler}
      />
    )
  })

  return (
    <React.Fragment>
      <h1>T-Shirts</h1>

      <div className="store">
        {shirtList}
      </div>
    </React.Fragment>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)