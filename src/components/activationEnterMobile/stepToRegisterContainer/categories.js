/** @jsx h */
import { h } from 'preact';
import style from '../style.css';

const categoryList = [
  { img: 'https://iccdn.in/category/mob-green.svg', title: 'Mobile' },
  {
    img: 'https://iccdn.in/category/homeApp-green.svg',
    title: 'Electronics & Appliances',
  },
  {
    img: 'https://iccdn.in/category/cat_apparel_green.svg',
    title: 'Fashion & Clothing',
  },
  {
    img: 'https://iccdn.in/category/cat_fitness_green.svg',
    title: 'Fitness & Personal care',
  },
  {
    img: 'https://iccdn.in/category/home-decor-green.svg',
    title: 'Home & Furnishing',
  },
  {
    img: 'https://iccdn.in/category/electronics-green.svg',
    title: 'Laptop & Tablets',
  },
  {
    img: 'https://iccdn.in/category/cat_watch_accessories_green.svg',
    title: 'Watches and Access',
  },
];

const Categories = () => {
  return (
    <div className={style.categoryContainer}>
      {categoryList.map((tile) => {
        return (
          <div className={style.tileContainer}>
            <div className={style.categoryDetails}>
              <div className={style.imageContainer}>
                <div
                  style={{ backgroundImage: `url(${tile.img})` }}
                  className={style.filterImage}
                />
              </div>
              <div className={style.tileDescription}>
                <div className='font14 text80 text-center'>{tile.title}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
