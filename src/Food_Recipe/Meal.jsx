import React, { useEffect, useState } from "react";
import "./meal.css";

const Meal = () => {
  const [mealData, setMealData] = useState([]);
  const [mealDataId, setMealDataId] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [area, setArea] = useState("indian");
  const [inputData, setInputData] = useState("");

  useEffect(() => {
    const fetchDatafromApi = async () => {
      const api = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
      );
      const data = await api.json();
      // console.log(data.meals);

      setMealData(data.meals);
    };
    fetchDatafromApi();
  }, [area]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputData}`
    );
    const data = await api.json();
    // console.log(data.meals);

    setMealData(data.meals);
    //   inputData("")
  };

  const getCategorys = async () => {
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    const data = await api.json();
    // console.log(data.categories);
    setCategoryData(data.categories);
  }

  useEffect(() => {
    getCategorys()
  }, [])

  const getByCategorys = async (cat) => {
    console.log(cat)
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
    const data = await api.json();
    // console.log(data);
    // console.log(data.meals);
    setMealData(data.meals);
  }

  const getDataByMealId = async (cat) => {
    console.log(cat)
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${cat}`);
    const data = await api.json();
    // console.log(data);
    // console.log(data.meals[0],"BYID");
    setMealDataId(data.meals[0]);
  }

  return (
    <>
    <div className="conatiner text-center">
      <div className="my-3 d-flex flex-wrap justify-content-center" style={{margin: "auto" }}>
        <button
          onClick={() => setArea("indian")}
          type="button"
          className="btn btn-outline-primary mrx-1 mrt-1"
        >
          Indian
        </button>
        <button
          onClick={() => setArea("chinese")}
          type="button"
          className="btn btn-outline-secondary mrx-1 mrt-1"
        >
          Chinese
        </button>
        <button
          onClick={() => setArea("canadian")}
          type="button"
          className="btn btn-outline-success mrx-1 mrt-1"
        >
          Canadian
        </button>
        <button
          onClick={() => setArea("thai")}
          type="button"
          className="btn btn-outline-danger mrx-1 mrt-1"
        >
          Thai
        </button>
        <button
          onClick={() => setArea("japanese")}
          type="button"
          className="btn btn-outline-warning mrx-1 mrt-1"
        >
          Japanese
        </button>
        <button
          onClick={() => setArea("turkish")}
          type="button"
          className="btn btn-outline-info mrx-1 mrt-1"
        >
          Turkish
        </button>
        <button
          onClick={() => setArea("american")}
          type="button"
          className="btn btn-outline-light mrx-1 mrt-1"
        >
          American
        </button>
        <button
          onClick={() => setArea("russian")}
          type="button"
          className="btn btn-outline-secondary mrx-1 mrt-1"
        >
          Russian
        </button>
      </div>
      </div>
      <form onSubmit={submitHandler} className="mx-auto text-center my-3">
        <input onChange={(e) => setInputData(e.target.value)} type="text" placeholder="Search Food"/>
      </form>
      <div className="container">
        <div className="my-3 d-flex flex-wrap justify-content-center" style={{ margin: "auto" , textAlign: "center"}}>
          {categoryData.length ? categoryData.map((data) => <div key={data.idCategory}>
          <button
          onClick={() => getByCategorys(data.strCategory)}
          type="button"
          className="btn btn-outline-primary mrx-1 mrt-1"
        >
          {data.strCategory}
        </button>
          </div>) : <div></div>}
        
        </div>
      </div>
      <div className="meal-main-content" style={{}}>
        {mealData ? (
          mealData.map((data) => (
            <div key={data.idMeal} style={{ textAlign: "center" }} >
              <div>
                <img
                  id={data.idMeal}
                  src={data.strMealThumb}
                  alt=""
                  className="img-bx"
                  onClick={() => getDataByMealId(data.idMeal)}
                  data-bs-toggle="modal" data-bs-target="#exampleModal"
                  style={{
                    
                  }}
                  
                />
              </div>
              <h5 className="meal-ft">{data.strMeal}</h5>
            </div>
          ))
        ) : (
          <div className="">
            <h4>Opps No Data Found!!</h4>
          </div>
        )}
      </div>
      <div className="">
            {/* <!-- Button trigger modal --> */}
        {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
        </button> */}
          {/* <!-- Modal --> */}
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
        {/* {mealDataId.length ? mealDataId.map((mdata) => <div key={mdata.idMeal}> */}
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">{mealDataId.strMeal}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="w-100">
               <img className="w-25 h-50" src={mealDataId.strMealThumb} alt=""/>
              </div>
              <div className="">
              <span class="badge text-bg-secondary">Tags : </span> <span class="badge text-bg-light"> {mealDataId.strTags} </span>
              </div>
                <div className="d-flex gap-3">
                  <div>
                    Area: {mealDataId.strArea}
                  </div>
                  <div>
                    Category: {mealDataId.strCategory}
                  </div>
                </div>

                <div className="">
                  Ingrediants
                  <ul>
                   {mealDataId.strIngredient1 && 
                    <li className="strIngredient1"> {mealDataId.strIngredient1} - <span class="badge text-bg-warning"> {mealDataId.strMeasure1} </span></li>
                   }
                   {mealDataId.strIngredient2 && 
                    <li className="strIngredient1"> {mealDataId.strIngredient2} - <span class="badge text-bg-warning"> {mealDataId.strMeasure2} </span></li>
                   }
                   {mealDataId.strIngredient3 && 
                    <li className="strIngredient1"> {mealDataId.strIngredient3} - <span class="badge text-bg-warning"> {mealDataId.strMeasure3} </span></li>
                   }
                   {mealDataId.strIngredient4 && 
                    <li className="strIngredient1"> {mealDataId.strIngredient4} - <span class="badge text-bg-warning"> {mealDataId.strMeasure4} </span></li>
                   }
                   {mealDataId.strIngredient5 && 
                    <li className="strIngredient1"> {mealDataId.strIngredient5} - <span class="badge text-bg-warning"> {mealDataId.strMeasure5} </span></li>
                   }
                   {mealDataId.strIngredient6 && 
                    <li className="strIngredient1"> {mealDataId.strIngredient6} - <span class="badge text-bg-warning"> {mealDataId.strMeasure6} </span></li>
                   }
                   {mealDataId.strIngredient7 && 
                    <li className="strIngredient1"> {mealDataId.strIngredient7} - <span class="badge text-bg-warning"> {mealDataId.strMeasure7} </span></li>
                   }
                   {mealDataId.strIngredient8 && 
                    <li className="strIngredient1"> {mealDataId.strIngredient8} - <span class="badge text-bg-warning"> {mealDataId.strMeasure8} </span></li>
                   }
                   {mealDataId.strIngredient9 && 
                    <li className="strIngredient1"> {mealDataId.strIngredient9} - <span class="badge text-bg-warning"> {mealDataId.strMeasure9} </span></li>
                   }
                   {mealDataId.strIngredient10 && 
                    <li className="strIngredient1"> {mealDataId.strIngredient10} - <span class="badge text-bg-warning"> {mealDataId.strMeasure10} </span></li>
                   }
                   {mealDataId.strIngredient11 && 
                    <li className="strIngredient1"> {mealDataId.strIngredient11} - <span class="badge text-bg-warning"> {mealDataId.strMeasure11} </span></li>
                   }
                   {mealDataId.strIngredient12 && 
                    <li className="strIngredient1"> {mealDataId.strIngredient12} - <span class="badge text-bg-warning"> {mealDataId.strMeasure12} </span></li>
                   }
                   {mealDataId.strIngredient13 && 
                    <li className="strIngredient1"> {mealDataId.strIngredient13} - <span class="badge text-bg-warning"> {mealDataId.strMeasure13} </span></li>
                   }
                   {mealDataId.strIngredient14 && 
                    <li className="strIngredient1"> {mealDataId.strIngredient14} - <span class="badge text-bg-warning"> {mealDataId.strMeasure14} </span></li>
                   }
                   {mealDataId.strIngredient15 && 
                    <li className="strIngredient1"> {mealDataId.strIngredient15} - <span class="badge text-bg-warning"> {mealDataId.strMeasure15} </span></li>
                   }
                   {mealDataId.strIngredient16 && 
                    <li className="strIngredient1"> {mealDataId.strIngredient16} - <span class="badge text-bg-warning"> {mealDataId.strMeasure16} </span></li>
                   }
                   {mealDataId.strIngredient17 && 
                    <li className="strIngredient1"> {mealDataId.strIngredient17} - <span class="badge text-bg-warning"> {mealDataId.strMeasure17} </span></li>
                   }
                   {mealDataId.strIngredient18 && 
                    <li className="strIngredient1"> {mealDataId.strIngredient18} - <span class="badge text-bg-warning"> {mealDataId.strMeasure18} </span></li>
                   }
                   {mealDataId.strIngredient19 && 
                    <li className="strIngredient1"> {mealDataId.strIngredient19} - <span class="badge text-bg-warning"> {mealDataId.strMeasure19} </span></li>
                   }
                   {mealDataId.strIngredient20 && 
                    <li className="strIngredient1"> {mealDataId.strIngredient20} - <span class="badge text-bg-warning"> {mealDataId.strMeasure20} </span></li>
                   }
                  </ul>
                </div>

                {/* <div className="">
                  Ingrediants
                  <ul>
                   {mealDataId.strMeasure1 && 
                    <li className="strMeasure1"> {mealDataId.strMeasure1}</li>
                   }
                   {mealDataId.strMeasure2 && 
                    <li className="strMeasure1"> {mealDataId.strMeasure2}</li>
                   }
                   {mealDataId.strMeasure3 && 
                    <li className="strMeasure1"> {mealDataId.strMeasure3}</li>
                   }
                   {mealDataId.strMeasure4 && 
                    <li className="strMeasure1"> {mealDataId.strMeasure4}</li>
                   }
                   {mealDataId.strMeasure5 && 
                    <li className="strMeasure1"> {mealDataId.strMeasure5}</li>
                   }
                   {mealDataId.strMeasure6 && 
                    <li className="strMeasure1"> {mealDataId.strMeasure6}</li>
                   }
                   {mealDataId.strMeasure7 && 
                    <li className="strMeasure1"> {mealDataId.strMeasure7}</li>
                   }
                   {mealDataId.strMeasure8 && 
                    <li className="strMeasure1"> {mealDataId.strMeasure8}</li>
                   }
                   {mealDataId.strMeasure9 && 
                    <li className="strMeasure1"> {mealDataId.strMeasure9}</li>
                   }
                   {mealDataId.strMeasure10 && 
                    <li className="strMeasure1"> {mealDataId.strMeasure10}</li>
                   }
                   {mealDataId.strMeasure11 && 
                    <li className="strMeasure1"> {mealDataId.strMeasure11}</li>
                   }
                   {mealDataId.strMeasure12 && 
                    <li className="strMeasure1"> {mealDataId.strMeasure12}</li>
                   }
                   {mealDataId.strMeasure13 && 
                    <li className="strMeasure1"> {mealDataId.strMeasure13}</li>
                   }
                   {mealDataId.strMeasure14 && 
                    <li className="strMeasure1"> {mealDataId.strMeasure14}</li>
                   }
                   {mealDataId.strMeasure15 && 
                    <li className="strMeasure1"> {mealDataId.strMeasure15}</li>
                   }
                   {mealDataId.strMeasure16 && 
                    <li className="strMeasure1"> {mealDataId.strMeasure16}</li>
                   }
                   {mealDataId.strMeasure17 && 
                    <li className="strMeasure1"> {mealDataId.strMeasure17}</li>
                   }
                   {mealDataId.strMeasure18 && 
                    <li className="strMeasure1"> {mealDataId.strMeasure18}</li>
                   }
                   {mealDataId.strMeasure19 && 
                    <li className="strMeasure1"> {mealDataId.strMeasure19}</li>
                   }
                   {mealDataId.strMeasure20 && 
                    <li className="strMeasure1"> {mealDataId.strMeasure20}</li>
                   }
                  </ul>
                </div> */}

                <div className="">
                  {mealDataId.strInstructions}
                </div>
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <div className="d-flex gap-3">
              <a href={mealDataId.strSource} type="button" className="btn btn-primary" >Source <i class="bi bi-link-45deg"></i></a>
              <a type="button" className="btn btn-danger" href={mealDataId.strYoutube}>Youtube <i class="bi bi-youtube"></i></a>
              </div>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        {/* </div>) : <div>
        
          </div>} */}
        </div>
        </div>
        
      </div>
    </>
  );
};

export default Meal;
