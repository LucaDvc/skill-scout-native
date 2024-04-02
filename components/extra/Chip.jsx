import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const Chip = ({ label, onDelete, onPress, color = '#000' }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.chip, { borderColor: color }]}
    >
      <Text style={[styles.label, { color }]}>{label}</Text>
      {onDelete && (
        <TouchableOpacity onPress={onDelete} style={styles.deleteIcon}>
          <Text style={[styles.icon, { color }]}>✕</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 32,
    margin: 4,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 16,
  },
  deleteIcon: {
    marginLeft: 8,
  },
  icon: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Chip;
