import { SafeAreaView, StyleSheet, View } from "react-native";
import {
  Provider as PaperProvider,
  Text,
} from "react-native-paper";
import ImageUpload from "./components/ImageUpload";
import Header from "./components/Header";
import { theme } from "./theme";
import CatImageList from "./components/CatImageList"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  const handleImageSelected = (uri: string) => {
    console.log("Selected image URI:", uri);
    // You can do something with the selected image URI here
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.header}>
          <Text variant="titleSmall">Submit a new cat image?</Text>
          <ImageUpload onImageSelected={handleImageSelected} />
        </View>
        <QueryClientProvider client={queryClient}>
          <CatImageList />
        </QueryClientProvider>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.m,
    padding: theme.spacing.m,
  },
});
