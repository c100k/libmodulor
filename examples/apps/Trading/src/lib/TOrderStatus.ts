import { TString } from '../../../../../dist/esm/index.js';

export type OrderStatus = 'cancelled' | 'pending';

export class TOrderStatus extends TString<OrderStatus, 'OrderStatus'> {
    public static readonly FORMAT: RegExp = /^(cancelled|pending)$/;

    constructor() {
        super({
            format: { f: 'OrderStatus', regexp: TOrderStatus.FORMAT },
        });

        this.setSemanticsMapping({
            cancelled: { variant: 'warning' },
            pending: { variant: 'info' },
        });
    }

    public override example(): OrderStatus {
        return 'pending';
    }
}
