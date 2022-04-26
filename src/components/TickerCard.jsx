import { useEffect, useState } from 'react'
import { Card, Row, Col, Badge, Container, Button } from 'reactstrap'
import CryptoIcon from './CryptoIcon'
import axios from 'axios'
import { remove } from '../monListSlice'
import { useDispatch } from 'react-redux'

const TickerCard = ({ symbol, displayName }) => {
  const [price, setPrice] = useState('--')
  const [vio, setVio] = useState(0)
  const [coinName, setCoinName] = useState()
  const dispatch = useDispatch()

  const getMarketdata = () => {
    const url = `https://api.huobi.pro/market/detail/merged?symbol=${symbol}`
    axios
      .get(url)
      .then((res) => {
        return res.data.tick
      })
      .then((data) => {
        const askPrice = data.ask[0].toFixed(1)
        const openPrice = data.open
        const closePrice = data.close
        const vioChange = (((closePrice - openPrice) / openPrice) * 100).toFixed(2)
        // @ts-ignore
        setVio(`${vioChange}%`)
        setPrice(askPrice)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    setCoinName(displayName.split('/')[0].toLowerCase())
    getMarketdata()
    setInterval(() => {
      getMarketdata()
    }, 5000)
  }, [])

  return (
    <Card>
      <Container>
        <Row>
          <Col xs="1" md="1" sm="1">
            <Button
              close
              size={'sm'}
              onClick={() => {
                dispatch(remove({ symbol: symbol, displayName: displayName }))
              }}
            />
          </Col>
          <Col xs="1" md="1" sm="1" style={{ padding: 0 }}>
            <CryptoIcon symbol={coinName} size={25} />
          </Col>
          <Col xs="4" md="4" sm="4" style={{ padding: 0 }}>
            {displayName}
          </Col>
          <Col xs="3" md="3" sm="3" style={{ padding: 0 }}>
            {price}
          </Col>
          <Col xs="3" md="3" sm="3" style={{ padding: 0 }}>
            <Badge color={vio > 0 ? 'success' : 'danger'}>{vio}</Badge>
          </Col>
        </Row>
      </Container>
    </Card>
  )
}

export default TickerCard
