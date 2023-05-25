export const load = ({ fetch }) => {
    const fetchGPSCoords = async () => {
      const res = await fetch("https://vda-lab.github.io/assets/vast2021_gps_coordinates.json")
      const data = await res.json()
      return data
    }
  
    const fetchBusiness = async () => {
      const res = await fetch("https://vda-lab.github.io/assets/vast2021_businesses.json")
      const data = await res.json()
      return data
    }
    const fetchCarstops = async () => {
        const res = await fetch(" https://vda-lab.github.io/assets/vast2021_carstops.json")
        const data = await res.json()
        return data
      }
  
    return {
      GPSCoords: fetchGPSCoords(),
      Business: fetchBusiness(),
      CarStops: fetchCarstops()

    }
}