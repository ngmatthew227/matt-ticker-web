import { useState, useEffect, Fragment } from 'react'
import Select from 'react-select'
import axios from 'axios'
import { Button, Container, Row, Col } from 'reactstrap'
import { add, remove } from '../monListSlice'
import { useDispatch } from 'react-redux'

const SearchBar = () => {
  const [allSymbols, setAllSymbols] = useState([])
  const [selected, setSelected] = useState({})
  const dispatch = useDispatch()

  const getAllSymbols = () => {
    const url = `https://api.huobi.pro/v2/settings/common/symbols`
    axios
      .get(url)
      .then((res) => {
        const data = res.data.data
        const symbolList = data.map((ele) => {
          const symbol = ele.sc
          const displayName = ele.dn
          return {
            label: displayName,
            value: symbol,
          }
        })
        setAllSymbols(symbolList)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getAllSymbols()
  }, [])

  return (
    <Container>
      <Row>
        <Col xs="7" md="7">
          <Select
            options={allSymbols}
            value={selected}
            onChange={(value) => {
              setSelected(value)
            }}
          />
        </Col>
        <Col xs="5" md="5">
          <Button
            color={'primary'}
            onClick={() => {
              dispatch(add(selected))
            }}
          >
            Add to List
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default SearchBar
