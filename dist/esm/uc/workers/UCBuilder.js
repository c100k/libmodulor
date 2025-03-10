var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { injectable } from 'inversify';
import { UC } from '../UC.js';
/**
 * Build a Use Case
 *
 * When initially implemented this, {@link I18nManager} was injected to provide the `languageCode` to the {@link UC}.
 *
 * But this dependency has been removed when introducing {@link WordingManager}. Let's keep it for now in case we need to inject something.
 */
let UCBuilder = class UCBuilder {
    exec({ appManifest, auth, def }) {
        return new UC(appManifest, def, auth);
    }
};
UCBuilder = __decorate([
    injectable()
], UCBuilder);
export { UCBuilder };
