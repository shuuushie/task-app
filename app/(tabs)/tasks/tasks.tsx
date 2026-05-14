import { deleteTask, getTasks, Task } from "@/lib/database";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = () => {
    try {
      const data = getTasks();
      setTasks(data);
    } catch (error) {
      Alert.alert("Load Error", "Failed to load tasks");
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, []),
  );

   const handleDelete = (id: number) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          try {
            deleteTask(id);
            loadTasks();
          } catch (error) {
            Alert.alert("Delete Error", "Failed to delete task");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task List</Text>

      <Pressable
        style={styles.addButton}
        onPress={() => router.push("/(tabs)/tasks/add-task")}
      >
        <Text style={styles.addButtonText}>Add Task</Text>
      </Pressable>

      {tasks.length === 0 ? (
        <Text style={styles.emptyText}>No Tasks yet.</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskDescription}>{item.description}</Text>
              <Text style={styles.taskStatus}>{item.status}</Text>

              <View style={styles.actions}>
                <Pressable
                  style={styles.detailButton}
                  onPress={() =>
                    router.push({
                      pathname: "/(tabs)/tasks/task-detail",
                      params: {
                        id: item.id,
                        title: item.title,
                        description: item.description,
                        status: item.status,
                      },
                    })
                  }
                >
                  <Text style={styles.detailButtonText}>View Details</Text>
                </Pressable>

                <Pressable
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      )}
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
  card: {
    backgroundColor: "#ededed",
    borderWidth: 1,
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#676",
    marginTop: 20,
  },
  addButton: {
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  taskDescription: {
    fontSize: 14,
    color: "#444",
    marginBottom: 6,
  },
  taskStatus: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  detailButton: {
    backgroundColor: "#1565c0",
    padding: 10,
    borderRadius: 8,
  },
  detailButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#c01515",
    padding: 10,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
