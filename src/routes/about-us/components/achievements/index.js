// @flow
/** @jsx h */
import { h } from 'preact';
import style from '../../style.css';

const Achievements = () => {
  return (
    <div className={` ${style.achievementsContainer} font14`}>
      <div className={`${style.achievements}`}>
        <table border='0' cellSpacing='0' cellPadding='0'>
          <tr>
            <td className={`${style.tableCell}`} width='30%'>
              <div
                className={`${
                  style.achievementCount
                } font20 text-center bold-text`}>
                3800<span class='font14 bold-text'>+</span>
              </div>
              <div
                className={`${style.achievementCategory} font14 text-center`}>
                Top Merchants
              </div>
            </td>
            <td className={`${style.tableCell}`} width='30%'>
              <div
                className={`${
                  style.achievementCount
                } font20 text-center bold-text`}>
                25M +
              </div>
              <div
                className={`${style.achievementCategory} font14  text-center`}>
                Credit Lines
              </div>
            </td>
            <td className={` ${style.tableCell}`} width='30%'>
              <div
                className={`${
                  style.achievementCount
                } font20  text-center bold-text`}>
                6
              </div>
              <div
                className={`${style.achievementCategory} font14  text-center`}>
                Lending Partners
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Achievements;
