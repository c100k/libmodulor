import { useState } from 'react';
function append(a, b) {
    const { items, pagination: { total }, } = b;
    const newItems = a.items.concat(items);
    const newTotal = a.pagination.total + total;
    return {
        ...a,
        items: newItems,
        pagination: {
            label: `${newItems.length}/${newTotal}`,
            total: newTotal,
        },
    };
}
function remove(part, item) {
    const newItems = part.items.filter((i) => i.id !== item.id);
    const newTotal = part.pagination.total - 1;
    return {
        ...part,
        items: part.items.filter((i) => i.id !== item.id),
        pagination: {
            label: `${newItems.length}/${newTotal}`,
            total: newTotal,
        },
    };
}
function update(a, b) {
    const { items } = b;
    const updatedItemIds = new Map(items.map((i) => [i.id, i]));
    const newItems = a.items.map((i) => {
        const updatedItem = updatedItemIds.get(i.id);
        if (!updatedItem) {
            return i;
        }
        return updatedItem;
    });
    return {
        ...a,
        items: newItems,
    };
}
/**
 * This hook provides utilities to act on a {@link UCOutputReader} in a React way
 *
 * A usual scenario of this is a "CRUD-like" UI displaying multiple use cases :
 *
 *   - A `List` use case to display a collection of items
 *   - A `Create` use case to add an item
 *   - A `Delete` use case to remove an item
 *   - An `Update` use case to update an item
 *
 * Whenever one of this use case is performed, you can use the `ucor` to act on the main UCOR in an immutable way.
 *
 * @param ucor
 * @returns
 */
export function useUCOR(ucor) {
    const [part0, setPart0] = useState(ucor.part0());
    const [part1, setPart1] = useState(ucor.part1());
    /**
     * Append items to part0
     * @param ucor2
     * @returns
     */
    const append0 = (ucor2) => setPart0((prev) => append(prev, ucor2.part0()));
    /**
     * Append items to part1 (if applicable)
     * @param ucor2
     * @returns
     */
    const append1 = (ucor2) => setPart1((prev) => {
        const b = ucor2.part1();
        if (!prev || !b) {
            return;
        }
        return append(prev, b);
    });
    /**
     * Remove the item from part0
     * @param item
     * @returns
     */
    const remove0 = (item) => setPart0((prev) => remove(prev, item));
    /**
     * Remove the item from part1 (if applicable)
     * @param item
     * @returns
     */
    const remove1 = (item) => setPart1((prev) => {
        if (!prev) {
            return;
        }
        return remove(prev, item);
    });
    /**
     * Update items in part0
     * @param ucor2
     * @returns
     */
    const update0 = (ucor2) => setPart0((prev) => update(prev, ucor2.part0()));
    /**
     * Update items in part1 (if applicable)
     * @param ucor2
     * @returns
     */
    const update1 = (ucor2) => setPart1((prev) => {
        const b = ucor2.part1();
        if (!prev || !b) {
            return;
        }
        return update(prev, b);
    });
    return [
        part0,
        part1,
        {
            append0,
            append1,
            remove0,
            remove1,
            update0,
            update1,
        },
    ];
}
