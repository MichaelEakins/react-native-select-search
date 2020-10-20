import React, {Fragment, useEffect, useState} from 'react';
import {
  FlatList,
  GestureResponderEvent,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {styles} from './styles';
import {SelectItem} from './components/SelectItem';
import {SelectContainer} from './components/SelectContainer';
import {Colors} from '../Utils';

export interface SelectItem {
  itemLabel: string;
  itemValue: string;
}

interface ISelect {
  dropDownContainerStyle?: ViewStyle; //Optional: This allows changing the drop down height
  errorTextStyle?: TextStyle; //Optional: style for error text.
  itemLabel?: string; //Optional: If the data set has a displayed value that is not name , set it here.
  itemValue?: string | number; //Optional: If the data set has a value that is not id, set it here.
  items: any[]; //Dataset to use
  placeholderTextColor?: string; //Optional: This allows changing the placeholder text color if searchable is true
  searchPlaceHolder?: string; //Optional: This is the text displayed as a placeholder if searchable is true
  searchable?: boolean; //Optional: This determines if the data is searchable/filterable
  searchCallback?: (searchText: string) => void; //Optional: This allows for passing in a callback when search text is entered so that filtering can be performed via a custom method or your own search API.
}

export const Select: React.FC<ISelect> = ({
  dropDownContainerStyle,
  errorTextStyle,
  itemLabel = 'name',
  itemValue = 'id',
  items,
  placeholderTextColor = Colors.silver,
  searchCallback,
  searchPlaceHolder = 'Search',
  searchable = false,
}) => {
  const [filteredItems, setFilteredItems] = useState(items);
  const [isSearching, setIsSearching] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedItem, setSelectedItem] = useState(undefined);
  const [showDropDown, setShowDropDown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setShowDropDown((showDropDown) => !showDropDown);
    } else {
      setIsLoading((isLoading) => !isLoading);
    }
  }, [selectedItem, setSelectedItem]);

  useEffect(() => {
    if (!searchCallback) {
      const results = items.filter((item) =>
        searchFilter !== ''
          ? item[itemLabel].toLowerCase().includes(searchFilter.toLowerCase())
          : items,
      );
      setFilteredItems(results);
    } else {
      searchCallback(searchFilter);
    }

    console.log('HERE');
    setIsSearching(true);
  }, [searchFilter, setSearchFilter]);

  const handlePress = (id: string | number) => {
    const currentItem = items.find((item) => item[itemValue] === id);
    setSelectedItem(currentItem);
  };

  const renderItem = ({item, index}) => {
    const id = item[itemValue];
    const label = item[itemLabel];

    return <SelectItem id={id} label={label} handlePress={handlePress} />;
  };

  const handleDropDownPress = (event: GestureResponderEvent) => {
    setShowDropDown((showDropDown) => !showDropDown);
  };

  return (
    <View style={styles.container}>
      <SelectContainer
        handleDropDownPress={handleDropDownPress}
        selectedItem={selectedItem}
        itemLabel={itemLabel}
      />
      {showDropDown && (
        <Fragment>
          {searchable && (
            <View style={{backgroundColor: Colors.alabaster}}>
              <TextInput
                placeholder={searchPlaceHolder}
                placeholderTextColor={placeholderTextColor}
                onChangeText={(text) => setSearchFilter(text)}
                defaultValue={searchFilter}
                autoFocus={true}
                autoCapitalize="none"
                selectTextOnFocus={false}
              />
            </View>
          )}
          <View style={[styles.dropDownContainer, dropDownContainerStyle]}>
            {filteredItems.length > 0 && (
              <FlatList
                data={filteredItems}
                keyExtractor={(item) => `${item[itemValue]}`}
                renderItem={renderItem}
                extraData={isSearching}
              />
            )}
            {filteredItems.length === 0 && (
              <Text style={[styles.noResultsText, errorTextStyle]}>
                No results found
              </Text>
            )}
          </View>
        </Fragment>
      )}
    </View>
  );
};
