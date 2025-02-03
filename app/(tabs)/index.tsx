import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  useColorScheme, // Hook to detect dark/light mode
} from "react-native";
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

// Define types
type Animal =
  | "dog"
  | "cat"
  | "rabbit"
  | "horse"
  | "elephant"
  | "cow"
  | "pig"
  | "goat"
  | "gorilla"
  | "sloth"
  | "hamster"
  | "turtle"
  | "ant"
  | "butterfly"
  | "spider"
  | "whale"
  | "goldfish"
  | "jellyfish";

type AnimalTimeMap = Record<Animal, number>;

const animalTimeMap: AnimalTimeMap = {
  dog: 7,
  cat: 4,
  rabbit: 10,
  horse: 3,
  elephant: 0.5,
  cow: 2,
  pig: 3,
  goat: 5,
  gorilla: 1.5,
  sloth: 0.5,
  hamster: 25,
  turtle: 0.2,
  ant: 50,
  butterfly: 50,
  spider: 20,
  whale: 0.5,
  goldfish: 5,
  jellyfish: 0.1,
};

export default function HomeScreen() {
  const [humanTime, setHumanTime] = useState<string>("");
  const [animal, setAnimal] = useState<Animal>("dog");
  const [convertedTime, setConvertedTime] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  // Detect dark/light mode
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  // Define theme-based styles - this is mostly for modal
  const themeStyles = {
    text: {
      color: isDarkMode ? "white" : "black",
    },
    input: {
      backgroundColor: isDarkMode ? "#333" : "white",
      color: isDarkMode ? "white" : "black",
    },
    pickerButton: {
      backgroundColor: isDarkMode ? "#333" : "white",
    },
    modalContent: {
      backgroundColor: isDarkMode ? "#333" : "white",
    },
  };

  const convertTime = () => {
    const factor = animalTimeMap[animal] || 1;
    const result = parseFloat(humanTime) * factor;
    setConvertedTime(result.toFixed(2));
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={[styles.title, themeStyles.text]}>
        Animal Time Converter
      </ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Enter human time (years)"
        placeholderTextColor={isDarkMode ? "#888" : "#999"}
        keyboardType="numeric"
        value={humanTime}
        onChangeText={setHumanTime}
      />
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => setModalVisible(true)}
      >
        <ThemedText style={themeStyles.text}>
          Select Animal: {animal}
        </ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={convertTime}>
        <ThemedText style={styles.buttonText}>Convert</ThemedText>
      </TouchableOpacity>
      {convertedTime !== null && (
        <ThemedText style={styles.result}>
          {isNaN(Number(convertedTime))
            ? "NaN ain't no number I ever heard of!"
            : `Converted Time: ${convertedTime} ${animal} years`}
        </ThemedText>
      )}

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
      >
        <View style={[styles.modalContent, themeStyles.modalContent]}>
          <Picker
            selectedValue={animal}
            onValueChange={(itemValue: Animal) => {
              setAnimal(itemValue); // Update the selected animal
              setModalVisible(false);
            }}
            style={themeStyles.text}
          >
            <Picker.Item label="Dog" value="dog" />
            <Picker.Item label="Cat" value="cat" />
            <Picker.Item label="Rabbit" value="rabbit" />
            <Picker.Item label="Horse" value="horse" />
            <Picker.Item label="Elephant" value="elephant" />
            <Picker.Item label="Cow" value="cow" />
            <Picker.Item label="Pig" value="pig" />
            <Picker.Item label="Goat" value="goat" />
            <Picker.Item label="Gorilla" value="gorilla" />
            <Picker.Item label="Sloth" value="sloth" />
            <Picker.Item label="Hamster" value="hamster" />
            <Picker.Item label="Turtle" value="turtle" />
            <Picker.Item label="Ant" value="ant" />
            <Picker.Item label="Butterfly" value="butterfly" />
            <Picker.Item label="Spider" value="spider" />
            <Picker.Item label="Whale" value="whale" />
            <Picker.Item label="Goldfish" value="goldfish" />
            <Picker.Item label="Jellyfish" value="jellyfish" />
          </Picker>
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#26619c",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  pickerButton: {
    height: 50,
    borderColor: "#26619c",
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#26619c", // Blue background
    paddingVertical: 12,
    height: 50,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#FFFFFF", // White text
    fontSize: 16,
    fontWeight: "bold",
  },
});
