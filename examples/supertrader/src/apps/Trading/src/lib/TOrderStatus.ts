import { TString } from 'libmodulor';

export type OrderStatus = 'cancelled' | 'pending';

export class TOrderStatus extends TString<OrderStatus, 'OrderStatus'> {
    public static readonly FORMAT: RegExp = /^(cancelled|pending)$/;

    constructor() {
        super({
            format: { f: 'OrderStatus', regexp: TOrderStatus.FORMAT },
        });
    }

    public override example(): OrderStatus {
        return 'pending';
    }
}
