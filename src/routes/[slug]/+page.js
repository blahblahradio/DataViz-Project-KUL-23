
export const load = ({ fetch, params }) => {  
    const fetchCarStops = async () => {
    const res = await fetch('https://vda-lab.github.io/assets/vast2021_carstops.json')
    const data = await res.json()
    data.forEach((d) => { d.car})
    let data_for_slug = data.filter((d) => { return d.car == params.slug})
    return data_for_slug
  }


    const fetchGPS_Coords = async () => {
      const res = await fetch('https://vda-lab.github.io/assets/vast2021_gps_coordinates.json')
      const data = await res.json()
      data.forEach((d) => { d.car_id })
      let data_for_slug = data.filter((d) => { return d.car_id == params.slug})
      return data_for_slug
    }

  return {
    CarStops: fetchCarStops() ,
    GPS_Coords: fetchGPS_Coords()
  }
}