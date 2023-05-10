import { forwardRef } from "react";

export const ItemDescrSelect = forwardRef(({selectedValue, value, onChangeHandler, className}, ref) => {
  return  <select 
            defaultValue={selectedValue}
            value={value}
            ref={ref}
            onChange={onChangeHandler}
            className={className}
          >
            <option value="" defaultValue disabled hidden>Lunch menu</option>
            <option value="Soup of the Day">Soup of the Day</option>
            <option value="Linguini With White Wine Sauce">Linguini With White Wine Sauce</option>
            <option value="Eggplant and Mushroom Panini">Eggplant and Mushroom Panini</option>
            <option value="Chili Con Carne">Chili Con Carne</option>
          </select>
})

export const ItemQntSelect = forwardRef(({selectedValue, value, onChangeHandler, className}, ref) => {
  return <select defaultValue={selectedValue}
                value={value}
                ref={ref}
                onChange={onChangeHandler}
                className={className}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>})

