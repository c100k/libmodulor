export class UCOutputBuilder {
    output = {
        parts: {
            _0: {
                items: [],
                total: 0,
            },
        },
    };
    add(item) {
        this.output.parts._0.items.push(item);
        this.output.parts._0.total += 1;
        return this;
    }
    addAll(items) {
        this.output.parts._0.items.push(...items);
        this.output.parts._0.total += items.length;
        return this;
    }
    addAll1(items) {
        this.init1IfNecessary();
        // biome-ignore lint/style/noNonNullAssertion: set in the call above
        this.output.parts._1.items.push(...items);
        // biome-ignore lint/style/noNonNullAssertion: set in the call above
        this.output.parts._1.total += items.length;
        return this;
    }
    add1(item) {
        this.init1IfNecessary();
        // biome-ignore lint/style/noNonNullAssertion: set in the call above
        this.output.parts._1.items.push(item);
        // biome-ignore lint/style/noNonNullAssertion: set in the call above
        this.output.parts._1.total += 1;
        return this;
    }
    count() {
        return this.output.parts._0.total;
    }
    count1() {
        this.init1IfNecessary();
        // biome-ignore lint/style/noNonNullAssertion: set in the call above
        return this.output.parts._1.total;
    }
    has(predicate) {
        return !!this.output.parts._0.items.find(predicate);
    }
    get() {
        return this.output;
    }
    remove(predicate) {
        const idx = this.output.parts._0.items.findIndex(predicate);
        if (idx > -1) {
            this.output.parts._0.items.splice(idx, 1);
        }
        return this;
    }
    sort(sorter) {
        this.output.parts._0.items.sort(sorter);
        return this;
    }
    update(id, apply) {
        const item = this.output.parts._0.items.find((i) => i.id === id);
        if (item) {
            apply(item);
        }
        return this;
    }
    init1IfNecessary() {
        if (!this.output.parts._1) {
            this.output.parts._1 = {
                items: [],
                total: 0,
            };
        }
    }
}
