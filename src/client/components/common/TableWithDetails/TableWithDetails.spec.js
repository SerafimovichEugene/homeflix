import { assert } from 'chai';
import { describe, it } from 'mocha';

import TableWithDetails from './TableWithDetails';

const prepare = TableWithDetails.prepareDataForRender;

describe('prepare data for render table', () => {
  it('no body or header ', () => {
    assert.equal(prepare([]), null);
  });
});

describe('prepare data for render table with complex body and header', () => {
  it('complex body and header', () => {
    const header = [
      {
        key: 'id',
        weight: 1,
        alias: 'ID',
      },
      {
        key: 'createTime',
        weight: 2,
        alias: 'Create Time',
      },
      {
        key: 'name',
        weight: 3,
        alias: null,
      },
    ];
    const body = [
      { id: 3, createTime: 1, name: 'alex' },
      { id: 2, createTime: 2, name: 'john' },
      { id: 1, createTime: 3, name: 'ann' },
    ];
    const result = [
      {
        id: 0,
        weights: [1, 2, 3],
        values: [3, 1, 'alex'],
      },
      {
        id: 1,
        weights: [1, 2, 3],
        values: [2, 2, 'john'],
      },
      {
        id: 2,
        weights: [1, 2, 3],
        values: [1, 3, 'ann'],
      },
    ];
    assert.deepEqual(prepare(header, body), result);
  });

  it('complex body and header', () => {
    const header = [
      {
        key: 'id',
        weight: 1,
        alias: 'ID',
      },
      {
        key: 'createTime',
        weight: 2,
        alias: 'Create Time',
      },
      {
        key: 'name',
        weight: 3,
        alias: null,
      },
    ];
    const body = [
      { id: 3, createTime: 1, name: 'alex' },
      { id: 2, createTime: 2, name: 'john' },
    ];
    const result = [
      {
        id: 0,
        weights: [1, 2, 3],
        values: [3, 1, 'alex'],
      },
      {
        id: 1,
        weights: [1, 2, 3],
        values: [2, 2, 'john'],
      },
    ];
    assert.deepEqual(prepare(header, body), result);
  });

  it('complex body and header', () => {
    const header = [
      {
        key: 'id',
        weight: 1,
        alias: 'ID',
      },
      {
        key: 'name',
        weight: 3,
        alias: null,
      },
    ];
    const body = [
      { id: 3, createTime: 1, name: 'alex' },
      { id: 2, createTime: 2, name: 'john' },
      { id: 1, createTime: 3, name: 'ann' },
    ];
    const result = [
      {
        id: 0,
        weights: [1, 3],
        values: [3, 'alex'],
      },
      {
        id: 1,
        weights: [1, 3],
        values: [2, 'john'],
      },
      {
        id: 2,
        weights: [1, 3],
        values: [1, 'ann'],
      },
    ];
    assert.deepEqual(prepare(header, body), result);
  });

  it('complex body and header; empty body array', () => {
    const header = [
      {
        key: 'id',
        weight: 1,
        alias: 'ID',
      },
      {
        key: 'name',
        weight: 3,
        alias: null,
      },
    ];
    const body = [];
    const result = [];
    assert.deepEqual(prepare(header, body), result);
  });

  it('complex body and header', () => {
    const header = [
      {
        key: 'id',
        alias: 'ID',
      },
      {
        key: 'name',
        alias: null,
      },
    ];
    const body = [
      { id: 3, createTime: 1, name: 'alex' },
      { id: 2, createTime: 2, name: 'john' },
      { id: 1, createTime: 3, name: 'ann' },
    ];
    const result = [
      {
        id: 0,
        weights: [1, 1],
        values: [3, 'alex'],
      },
      {
        id: 1,
        weights: [1, 1],
        values: [2, 'john'],
      },
      {
        id: 2,
        weights: [1, 1],
        values: [1, 'ann'],
      },
    ];
    assert.deepEqual(prepare(header, body), result);
  });

  it('complex body with item as array', () => {
    const header = [
      {
        key: 'name',
        weight: 1,
        alias: null,
      },
      {
        key: 'users',
        weight: 1,
        alias: null,
      },
    ];
    const body = [
      { name: 'alex', users: ['alex1', 'alex2'] },
      { name: 'john', users: ['john1', 'john2'] },
      { name: 'ann', users: ['ann1', 'ann2'] },
    ];
    const result = [
      {
        id: 0,
        weights: [1, 1],
        values: ['alex', ['alex1', 'alex2']],
      },
      {
        id: 1,
        weights: [1, 1],
        values: ['john', ['john1', 'john2']],
      },
      {
        id: 2,
        weights: [1, 1],
        values: ['ann', ['ann1', 'ann2']],
      },
    ];
    assert.deepEqual(prepare(header, body), result);
  });

  it('complex body with item as object', () => {
    const header = [
      {
        key: 'name',
        weight: 1,
        alias: null,
      },
      {
        key: 'metadata',
        weight: 1,
        alias: null,
      },
    ];
    const body = [
      { name: 'alex', metadata: { description: '3123' } },
      { name: 'john', metadata: { description: '312' } },
      { name: 'ann', metadata: { description: '4235' } },
    ];
    const result = [
      {
        id: 0,
        weights: [1, 1],
        values: ['alex', { description: '3123' }],
      },
      {
        id: 1,
        weights: [1, 1],
        values: ['john', { description: '312' }],
      },
      {
        id: 2,
        weights: [1, 1],
        values: ['ann', { description: '4235' }],
      },
    ];
    assert.deepEqual(prepare(header, body), result);
  });
});
