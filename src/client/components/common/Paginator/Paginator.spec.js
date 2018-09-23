import { assert } from 'chai';
import { describe, it } from 'mocha';
import Paginator from './Paginator';

describe('Paginator', () => {
  const size = 20;
  describe('calcRange: totalElements = 65', () => {
    const totalElements = 65;
    it('number = 0', () => {
      const number = 0;
      const range = Paginator.calcRange(number, size, totalElements);
      assert.equal(range, '1 - 20');
    });
    it('number = 1', () => {
      const number = 1;
      const range = Paginator.calcRange(number, size, totalElements);
      assert.equal(range, '21 - 40');
    });
    it('number = 2', () => {
      const number = 2;
      const range = Paginator.calcRange(number, size, totalElements);
      assert.equal(range, '41 - 60');
    });
    it('number = 3', () => {
      const number = 3;
      const range = Paginator.calcRange(number, size, totalElements);
      assert.equal(range, '61 - 65');
    });
  });

  describe('calcRange: totalElements = 81', () => {

    const totalElements = 81;
    it('number = 0', () => {
      const number = 0;
      const range = Paginator.calcRange(number, size, totalElements);
      assert.equal(range, '1 - 20');
    });
    it('number = 3', () => {
      const number = 3;
      const range = Paginator.calcRange(number, size, totalElements);
      assert.equal(range, '61 - 80');
    });
    it('number = 4', () => {
      const number = 4;
      const range = Paginator.calcRange(number, size, totalElements);
      assert.equal(range, '81 - 81');
    });
  });

  describe('calcRange: totalElements = 149', () => {
    it('number = 6', () => {
      const totalElements = 149;
      const number = 6;
      const range = Paginator.calcRange(number, size, totalElements);
      assert.equal(range, '121 - 140');
    });

    it('number = 7', () => {
      const totalElements = 149;
      const number = 7;
      const range = Paginator.calcRange(number, size, totalElements);
      assert.equal(range, '141 - 149');
    });
  });


  describe('calc Pages Stack, totalPages = 496', () => {
    const totalPages = 496;
    const stackSize = 11;

    it('should calc Pages Stack, currentPage = 2', () => {
      const currentPage = 2;
      const arr = Paginator.calcPagesStack(currentPage, totalPages, stackSize);
      assert.deepEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], arr);
    });

    it('should calc Pages Stack, currentPage = 6', () => {
      const currentPage = 6;
      const arr = Paginator.calcPagesStack(currentPage, totalPages, stackSize);
      assert.deepEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], arr);
    });

    it('should calc Pages Stack, currentPage = 7', () => {
      const currentPage = 7;
      const arr = Paginator.calcPagesStack(currentPage, totalPages, stackSize);
      assert.deepEqual([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], arr);
    });

    it('should calc Pages Stack, currentPage = 82', () => {
      const currentPage = 82;
      const arr = Paginator.calcPagesStack(currentPage, totalPages, stackSize);
      assert.deepEqual([77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87], arr);
    });

    it('should calc Pages Stack, currentPage = 494', () => {
      const currentPage = 494;
      const arr = Paginator.calcPagesStack(currentPage, totalPages, stackSize);
      assert.deepEqual([486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496], arr);
    });

    it('should calc Pages Stack, currentPage = 491', () => {
      const currentPage = 491;
      const arr = Paginator.calcPagesStack(currentPage, totalPages, stackSize);
      assert.deepEqual([486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496], arr);
    });

    it('should calc Pages Stack, currentPage = 490', () => {
      const currentPage = 490;
      const arr = Paginator.calcPagesStack(currentPage, totalPages, stackSize);
      assert.deepEqual([485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495], arr);
    });

    it('should calc Pages Stack, currentPage = 489', () => {
      const currentPage = 489;
      const arr = Paginator.calcPagesStack(currentPage, totalPages, stackSize);
      assert.deepEqual([484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494], arr);
    });

    it('should calc Pages Stack, currentPage = 496', () => {
      const currentPage = 496;
      const arr = Paginator.calcPagesStack(currentPage, totalPages, stackSize);
      assert.deepEqual([486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496], arr);
    });
  });

  describe('calc Pages Stack, totalPages = 4', () => {
    const totalPages = 4;
    const stackSize = 4;

    it('should calc Pages Stack, currentPage = 2', () => {
      const currentPage = 2;
      const arr = Paginator.calcPagesStack(currentPage, totalPages, stackSize);
      assert.deepEqual([1, 2, 3, 4], arr);
    });

    it('should calc Pages Stack, currentPage = 4', () => {
      const currentPage = 4;
      const arr = Paginator.calcPagesStack(currentPage, totalPages, stackSize);
      assert.deepEqual([1, 2, 3, 4], arr);
    });
  });

  describe('calc Pages Stack, totalPages = 11', () => {

    const totalPages = 11;
    const stackSize = 11;

    it('should calc Pages Stack, currentPage = 5', () => {
      const currentPage = 5;
      const arr = Paginator.calcPagesStack(currentPage, totalPages, stackSize);
      assert.deepEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], arr);
    });

    it('should calc Pages Stack, currentPage = 5', () => {
      const currentPage = 6;
      const arr = Paginator.calcPagesStack(currentPage, totalPages, stackSize);
      assert.deepEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], arr);
    });

    it('should calc Pages Stack, currentPage = 10', () => {
      const currentPage = 10;
      const arr = Paginator.calcPagesStack(currentPage, totalPages, stackSize);
      assert.deepEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], arr);
    });

    it('should calc Pages Stack, currentPage = 11', () => {
      const currentPage = 11;
      const arr = Paginator.calcPagesStack(currentPage, totalPages, stackSize);
      assert.deepEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], arr);
    });
  });

  describe('calc Pages Stack, totalPages = 7', () => {
    const totalPages = 7;
    const stackSize = 7;

    it('should calc Pages Stack, currentPage = 6', () => {
      const currentPage = 6;
      const arr = Paginator.calcPagesStack(currentPage, totalPages, stackSize);
      assert.deepEqual([1, 2, 3, 4, 5, 6, 7], arr);
    });

    it('should calc Pages Stack, currentPage = 7', () => {
      const currentPage = 7;
      const arr = Paginator.calcPagesStack(currentPage, totalPages, stackSize);
      assert.deepEqual([1, 2, 3, 4, 5, 6, 7], arr);
    });
  });

  describe('calc Pages Stack, totalPages = 1', () => {
    const totalPages = 1;
    const stackSize = 1;

    it('should calc Pages Stack, currentPage = 6', () => {
      const currentPage = 1;
      const arr = Paginator.calcPagesStack(currentPage, totalPages, stackSize);
      assert.deepEqual([1], arr);
    });
  });
});
