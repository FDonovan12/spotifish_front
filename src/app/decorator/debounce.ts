export function Debounce(delay: number = 300): MethodDecorator {
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        let timeout: ReturnType<typeof setTimeout>;

        descriptor.value = function (...args: any[]) {
            clearTimeout(timeout);
            timeout = setTimeout(() => originalMethod.apply(this, args), delay);
        };

        return descriptor;
    };
}
