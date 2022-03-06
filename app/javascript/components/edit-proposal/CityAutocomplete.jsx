import React, { useState } from 'react';
import Autocomplete from 'react-autocomplete';

import { getCitiesByName } from '../../api';

const CityAutocomplete = ({ setCityData }) => {
    const [value, setValue] = useState();
    const [items, setItems] = useState([]);

    return (
        <Autocomplete
            getItemValue={val => val.display_name}
            wrapperProps={{
                className: 'mb-3',
                style: { display: 'block', position: 'relative' }
            }}
            renderInput={
                (props) => (
                    <input
                        className="form-control"
                        {...props}
                    />
                )
            }
            menuStyle={{ zIndex: '1000', position: 'absolute', top: '40px', left: 0}}
            items={items}
            renderItem={(item, isHighlighted) => (
                <div key={item.display_name} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                    {item.display_name}
                </div>
            )}
            value={value}
            onChange={({ target: { value }}) => {
                setValue(value);
                if (value.length < 3) {
                    setItems([]);
                    return
                }
                getCitiesByName(value).then(items => {
                    setItems(items);
                });
            }}
            onSelect={(_, {display_name, ...item}) => {
                setCityData(item)
            }}
        />
    );
}

export default CityAutocomplete;