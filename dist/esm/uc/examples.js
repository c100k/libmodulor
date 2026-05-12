export function ucfExamples(type) {
    const examples = type.getExamples();
    // Leaving the value `undefined` means you want the default value
    if (examples === undefined) {
        return [type.example()];
    }
    // Setting the examples to `[]` means you don't want them
    if (examples.length === 0) {
        return undefined;
    }
    return examples;
}
