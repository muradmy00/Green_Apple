import {assets} from '../assets/assets'

const Add = () => {


  return (
    
    <form>

      <div>

      <p>Upload Image</p>

      <div>
        <label htmlFor="image1">
          <img src={assets.upload_area} alt="" />
          <input type="file" id='image1' hidden/>
        </label>

          <label htmlFor="image1">
            <img src={assets.upload_area} alt="" />
            <input type="file" id='image1' hidden />
          </label>

          <label htmlFor="image1">
            <img src={assets.upload_area} alt="" />
            <input type="file" id='image1' hidden />
          </label>

          <label htmlFor="image1">
            <img src={assets.upload_area} alt="" />
            <input type="file" id='image1' hidden />
          </label>
      </div>

      </div>

      
      
    </form>
  )
}

export default Add
