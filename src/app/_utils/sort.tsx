export function sortArrByArrOrder(array: any, order: any, key: string) {
    array.sort(function (a: any, b: any) {
        var A = a[key], B = b[key];
        if (order.indexOf(A) > order.indexOf(B)) {
            return 1;
        } else {
            return -1;
        }
    });
    return array;
}