import { Button, notification } from 'antd';
import React from 'react'
import ReactWeather, { useWeatherBit } from 'react-open-weather';
import { CloudOutlined } from '@ant-design/icons';
const Weather = () => {
  const { data, isLoading, errorMessage } = useWeatherBit({
    key: 'a0eb269a0dd440b88e698f86e5ce4f17',
    lat: '7.4832',
    lon: '109.1404',
    lang: 'in',
    unit: 'M', // values are (M,S,I)
  });
  const openNotification = () => {
    const args = {
      description:
        <ReactWeather
          isLoading={isLoading}
          errorMessage={errorMessage}
          data={data}
          lang="en"
          locationLabel="Banyumas"
          unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
          showForecast
        />,
      duration: 1.5,
    };
    notification.open(args);
  };
  return (
    <Button type="ghost" onClick={openNotification} size='small' >
      <CloudOutlined />Cuaca
    </Button>
  )
}

export default Weather
