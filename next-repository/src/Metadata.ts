import "reflect-metadata"

export function Query(sql: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata("Query", sql, target.__proto__, descriptor.value.name);
    };
}