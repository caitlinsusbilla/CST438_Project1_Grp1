import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const SLOT_SIZE = width * 0.3;

const AddTeam = ({ isVisible, onClose, onSelectSlot }) => {
  const slots = [1, 2, 3, 4, 5, 6];

  const renderSlot = (slot) => (
    <TouchableOpacity
      key={slot}
      style={styles.slotButton}
      onPress={() => onSelectSlot(slot)}
    >
      <Text style={styles.slotText}>Slot {slot}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Select a slot for your Pokémon</Text>
          <View style={styles.slotsContainer}>
            <View style={styles.column}>
              {slots.slice(0, 3).map(renderSlot)}
            </View>
            <View style={styles.column}>
              {slots.slice(3, 6).map(renderSlot)}
            </View>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width * 0.8, // 80% of screen width
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  slotsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  column: {
    justifyContent: 'space-around',
  },
  slotButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    width: SLOT_SIZE,
    height: SLOT_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slotText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: '80%',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddTeam;