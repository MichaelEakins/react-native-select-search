import * as React from "react";
import { Fragment, useEffect, useState } from "react";
import {
  FlatList,
  GestureResponderEvent,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { styles } from "./styles";
import { SelectItem } from "./components/SelectItem/index";
import { SelectContainer } from "./components/SelectContainer/index";
import { Colors } from "react-native/Libraries/NewAppScreen";

export interface SelectProps {
  dropDownContainerStyle?: ViewStyle;
  errorTextStyle?: TextStyle;
  itemLabel?: string;
  itemValue?: string | number;
  items: any[];
  placeholderTextColor?: string;
  searchPlaceHolder?: string;
  searchable?: boolean;
  searchCallback?: (searchText: string) => void;
}

export const Select: React.FC<SelectProps> = ({
  dropDownContainerStyle,
  errorTextStyle,
  itemLabel = "name",
  itemValue = "id",
  items,
  placeholderTextColor = Colors.silver,
  searchCallback,
  searchPlaceHolder = "Search",
  searchable = false,
}) => {
  const [filteredItems, setFilteredItems] = useState(items);
  const [isSearching, setIsSearching] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
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
      const results = items.filter((item: any) =>
        searchFilter !== ""
          ? item[itemLabel].toLowerCase().includes(searchFilter.toLowerCase())
          : items
      );
      setFilteredItems(results);
    } else {
      searchCallback(searchFilter);
    }

    console.log("HERE");
    setIsSearching(true);
  }, [searchFilter, setSearchFilter]);

  const handlePress = (id: string | number) => {
    const currentItem = items.find((item: any) => item[itemValue] === id);
    setSelectedItem(currentItem);
  };

  const renderItem = ({ item }: any) => {
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
            <View style={{ backgroundColor: Colors.alabaster }}>
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
