jest.mock('@react-native-firebase/app', () => ({
    initializeApp: jest.fn(),
    apps: [],
    firestore: jest.fn(() => ({ collection: jest.fn() })),
  }));
  jest.mock('@react-native-firebase/firestore', () => ({}));
  
  describe('firestore datasource', () => {
    beforeEach(() => {
      jest.resetModules();
    });
  
    it('debe inicializar firebase si no hay apps y exportar db', () => {
      const firebase = require('@react-native-firebase/app');
      firebase.apps = [];
      const { db } = require('../../../src/data/datasources/firestore');
      expect(firebase.initializeApp).toHaveBeenCalled();
      expect(db).toBeDefined();
    });
  
    it('no debe inicializar firebase si ya hay apps', () => {
      const firebase = require('@react-native-firebase/app');
      firebase.apps = [{}];
      const { db } = require('../../../src/data/datasources/firestore');
      expect(firebase.initializeApp).not.toHaveBeenCalled();
      expect(db).toBeDefined();
    });
  });