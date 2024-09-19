import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const generations = [
  { name: 'Gen 1', range: [1, 151] },
  { name: 'Gen 2', range: [152, 251] },
  { name: 'Gen 3', range: [252, 386] },
  { name: 'Gen 4', range: [387, 493] },
  { name: 'Gen 5', range: [494, 649] },
  { name: 'Gen 6', range: [650, 721] },
  { name: 'Gen 7', range: [722, 809] },
  { name: 'Gen 8', range: [810, 905] },
  { name: 'Gen 9', range: [906, Infinity] },
  { name: 'All', range: [1, Infinity] }
];

const GenerationFilterModal = ({ isVisible, onClose, onSelectGeneration }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Generation</Text>
          <ScrollView>
            {generations.map((gen, index) => (
              <TouchableOpacity
                key={index}
                style={styles.genButton}
                onPress={() => {
                  onSelectGeneration(gen.range);
                  onClose();
                }}
              >
                <Text>{gen.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  genButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
});

export default GenerationFilterModal;