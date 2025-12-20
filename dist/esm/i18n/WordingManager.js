var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { inject, injectable } from 'inversify';
import { humanize, isBlank } from '../utils/index.js';
let WordingManager = class WordingManager {
    i18nManager;
    constructor(i18nManager) {
        this.i18nManager = i18nManager;
    }
    dt(type) {
        let desc = null;
        let label = '';
        const val = type.val();
        if (!isBlank(val)) {
            const tName = type.tName();
            desc = this.tOrNull(`dt_${tName}_${val}_desc`);
            if (type.shouldTranslateOptions()) {
                label = this.t(`dt_${tName}_${val}_label`);
            }
            else {
                const option = type.getOptions()?.find((o) => o.value === val);
                if (option) {
                    label = option.label;
                }
                else {
                    label = val.toString();
                }
            }
        }
        return { desc, label };
    }
    dtConstr(type) {
        const constraints = type.getConstraintsForHuman();
        if (!constraints) {
            return null;
        }
        const entries = Object.entries(constraints);
        if (entries.length === 0) {
            return null;
        }
        const parts = [];
        for (const [k, v] of Object.entries(constraints)) {
            parts.push(
            // TODO : Consider moving up the type hierarchy to fetch the constr of the parent when missing
            // e.g. TFreeTextShort > TString
            this.t(`dt_${type.tName()}_constr_${k}`, undefined, v));
        }
        return parts;
    }
    p() {
        return {
            desc: this.tOrNull('p_desc'),
            slogan: this.tOrNull('p_slogan'),
        };
    }
    uc(def) {
        const { name } = def.metadata;
        return {
            desc: this.tOrNull(`uc_${name}_desc`),
            label: this.t(`uc_${name}_label`, humanize(name)),
        };
    }
    ucClientConfirm(def) {
        const v = (k) => this.tOr(`uc_${def.metadata.name}_client_confirm_${k}`, `uc_client_confirm_${k}`);
        return {
            cancel: v('cancel'),
            confirm: v('confirm'),
            message: this.tOrNull(`uc_${def.metadata.name}_client_confirm_message`),
            title: v('title'),
        };
    }
    ucISubmit(def, state, ellipsis = '...') {
        const val = this.tOr(`uc_${def.metadata.name}_i_submit_${state}`, `uc_i_submit_${state}`);
        return state.endsWith('ing') ? `${val}${ellipsis}` : val;
    }
    ucif(field) {
        const { key } = field;
        const dynamicWording = field.getDynamicWording();
        return {
            desc: dynamicWording?.desc ?? this.tOrNull(`ucif_${key}_desc`),
            label: dynamicWording?.label ??
                this.t(`ucif_${key}_label`, humanize(key)),
        };
    }
    ucof(key) {
        return {
            desc: this.tOrNull(`ucof_${key}_desc`),
            label: this.t(`ucof_${key}_label`, humanize(key)),
        };
    }
    ucop(def, idx) {
        const { name } = def.metadata;
        return {
            empty: this.tOrNull(`uc_${name}_op_${idx}_empty`),
            label: this.tOrNull(`uc_${name}_op_${idx}_label`),
        };
    }
    t(key, fallback = undefined, expected = undefined) {
        return this.i18nManager.t(key, {
            fallback,
            vars: expected ? { expected } : {},
        });
    }
    tOr(key, fallbackKey) {
        let val = this.tOrNull(key);
        if (!val) {
            val = this.i18nManager.t(fallbackKey);
        }
        return val;
    }
    tOrNull(key) {
        return this.i18nManager.tOrNull(key);
    }
};
WordingManager = __decorate([
    injectable(),
    __param(0, inject('I18nManager')),
    __metadata("design:paramtypes", [Object])
], WordingManager);
export { WordingManager };
