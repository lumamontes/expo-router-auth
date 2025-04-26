import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import { useState } from "react";
import {
  Button,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { router } from "expo-router";

const products = [
  {
    id: "1",
    name: "Notebook",
    price: 1200,
    image: require("@/assets/images/notbook.jpeg"),
  },
  {
    id: "2",
    name: "Celular",
    price: 800,
    image: require("@/assets/images/celular.jpg"),
  },
  {
    id: "3",
    name: "Fone de ouvido",
    price: 150,
    image: require("@/assets/images/fone-ouvido.webp"),
  },
];

export default function Login() {
  const [recognizing, setRecognizing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [cart, setCart] = useState<string[]>([]);

  useSpeechRecognitionEvent("start", () => setRecognizing(true));
  useSpeechRecognitionEvent("end", () => setRecognizing(false));
  useSpeechRecognitionEvent("result", (event) => {
    const spokenText = event.results[0]?.transcript.toLowerCase();
    setTranscript(spokenText);

    // Extract quantity and product name from the spoken text
    setCart(["Celular"]);
  });

  useSpeechRecognitionEvent("error", (event) => {
    console.log("error code:", event.error, "error message:", event.message);
  });

  const handleStart = async () => {
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      console.warn("Permissions not granted", result);
      return;
    }
    ExpoSpeechRecognitionModule.start({
      lang: "pt-BR",
      interimResults: true,
      continuous: false,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <HStack className="justify-between items-center mb-4">
          <Text style={styles.heading}>Produtos</Text>
          <TouchableOpacity
            onPress={() => {
              setCart([]);
              setTranscript("");
              router.push("/(auth)/cart");
            }}

          >
            <MaterialIcons name="shopping-cart" size={24} color="#6200ee" />
          </TouchableOpacity>
        </HStack>

        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card className="p-5 rounded-lg max-w-[360px] m-3">
              <Image
                source={item.image}
                className="mb-6 h-[240px] w-full rounded-md aspect-[263/240]"
                alt={item.name}
              />
              <Heading size="md" className="mb-4">
                {item.name}
              </Heading>
              <Text className="text-sm font-normal mb-2 text-typography-700">
                Preço: R$ {item.price}
              </Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setCart((prev) => [...prev, item.name])}
              >
                <Text style={styles.addButtonText}>Adicionar ao Carrinho</Text>
              </TouchableOpacity>
            </Card>
          )}
        />
        <Text style={styles.heading}>Carrinho</Text>
        {cart.length > 0 ? (
          <View style={styles.cartContainer}>
            {cart.map((item, index) => (
              <View key={index} style={styles.cartItem}>
                <Text style={styles.cartItemText}>{item}</Text>
                <TouchableOpacity
                  onPress={() =>
                    setCart((prev) => prev.filter((_, i) => i !== index))
                  }
                >
                  <MaterialIcons name="delete" size={20} color="#ff0000" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.emptyCartText}>Seu carrinho está vazio</Text>
        )}
        <Text style={styles.heading}>Transcrição</Text>
        <Text>{transcript}</Text>
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.floatingButton,
          { backgroundColor: recognizing ? "#6300ee59" : "#6200ee" },
        ]}
        onPress={
          recognizing ? () => ExpoSpeechRecognitionModule.stop() : handleStart
        }
      >
        <MaterialIcons
          name={recognizing ? "mic-off" : "mic"}
          size={24}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
  addButton: {
    backgroundColor: "#6200ee",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  addButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  cartContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cartItemText: {
    fontSize: 16,
  },
  emptyCartText: {
    fontSize: 14,
    color: "#888",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#6200ee",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
