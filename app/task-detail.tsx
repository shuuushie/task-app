import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function TaskDetailScreen() {
  const { id, title, description, status } = useLocalSearchParams<{
    id: string;
    title: string;
    description: string;
    status: string;
  }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Detail</Text>
      <Text style={styles.label}>ID: {id}</Text>
      <Text style={styles.label}>Title: {title}</Text>
      <Text style={styles.label}>Description: {description}</Text>
      <Text style={styles.label}>Status: {status}</Text>

      <Pressable
        style={styles.editButton}
        onPress={() =>
          router.push({
            pathname: "/edit-task",
            params: { id, title, description, status },
          })
        }
      >
        <Text style={styles.editButtonText}>Edit Task</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: "#1565c0",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  editButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});
