import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../../constants";
import { Categories, ProductCard } from "../../components";
import {
  GetCategory,
  GetProductList,
  ProductFilter,
  ProductSearch,
} from "../../services/Products";

interface Product {
  id: string;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    GetProductList()
      .then((res) => setProducts(res.results))
      .finally(() => setLoading(false));
    GetCategory().then((res) => setCategory(res.results));
  }, []);

  const handleSearch = (value: string) => {
    setLoading(true);
    ProductSearch(value)
      .then((res) => setProducts(res.results))
      .finally(() => setLoading(false));
  };
  const handleFilter = (id: number) => {
    setLoading(true);
    ProductFilter(id)
      .then((res) => setProducts(res.results))
      .finally(() => setLoading(false));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          onChangeText={(text) => handleSearch(text)}
        />
        <Icon style={styles.iconSearch} name="search-outline" />
      </View>
      <View style={styles.category}>
        {category.map((item) => (
          <Categories
            key={item.id}
            {...item}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            handleFilter={handleFilter}
          />
        ))}
      </View>
      {loading && <ActivityIndicator color={"#516797"} size="large" />}
      <FlatList
        numColumns={2}
        data={products}
        renderItem={({ item }) => <ProductCard {...item} />}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.productCardBox}
      />
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },
  inputBox: {
    marginVertical: 20,
    padding: 15,
    height: 54,
    backgroundColor: "#F1F2F3",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
  iconSearch: {
    fontSize: 25,
    color: "#BBBCC4",
  },
  productCardBox: {
    gap: 6,
    flex: 1,
  },
  category: {
    flexDirection: "row",
    gap: 5,
    marginVertical: 10,
  },
});
