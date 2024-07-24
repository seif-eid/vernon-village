/**
 * This file contains the definitions of the interfaces used
 * to hold metadata about the content that will be displayed 
 * in the website.
 * 
 * - SysDataType are datatypes used for content display/input
 * - ContentField is a field of a content model. It has an associated SysDataType.
 * - ContentModel
 */

/**
 * An entity with a MongoDB key
 */
export interface KeyedEntity {
    _id: string
}

/**
 * An entity that will be used to create html elements (or url paths)
 */
export interface HtmlEntity {
    htmlName: string
}


/**
 * Represents a datatype that can be displayed in an HTML form
 * These are the datatypes for user input and storage.
 */
export interface SysDataType {
    name: string,
}

/**
 * A ContentField is metadata about community generated content.
 * 
 * In terms of content display, this interface represents how
 * data can be displayed. In terms of input and administration,
 * this represents how data can be managed.
 */
export interface ContentField {
    name: string,
    displayName: string,
    type: SysDataType,
}

/**
 * Data that will be displayed, and entered into forms.
 */
export interface ContentModel extends KeyedEntity, HtmlEntity {
    name: string,
    isAdminContent: boolean,
    isUserContent: boolean
    fields: Array<ContentField>
}


/**
 * Metadata about displayed content
 */
export interface ContentMetaData {
    isApproved: boolean
}

/**
 * Displayed content
 */
export interface ContentData extends KeyedEntity {
    meta: ContentMetaData,
    content: {}
}
