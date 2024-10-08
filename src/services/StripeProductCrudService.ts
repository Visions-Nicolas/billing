import StripeService from './StripeSubscriptionSyncService';
import {Logger} from '../libs/Logger';
import Stripe from 'stripe';

class StripeProductCrudService {
  private static instance: StripeProductCrudService;
  private stripeService: Stripe | null = null;

  private constructor() {
    const stripeInstance = StripeService.retrieveServiceInstance().getStripe();
    if (stripeInstance) {
      this.stripeService = stripeInstance;
    } else {
      throw new Error('Stripe instance is not initialized.');
    }
  }

  public static retrieveServiceInstance(): StripeProductCrudService {
    if (!StripeProductCrudService.instance) {
      StripeProductCrudService.instance = new StripeProductCrudService();
    }
    return StripeProductCrudService.instance;
  }

  public async createProduct(
    productData: Stripe.ProductCreateParams,
    options?: Stripe.RequestOptions,
  ): Promise<Stripe.Product | null> {
    try {
      if (!this.stripeService) {
        throw new Error('Stripe instance is not initialized.');
      }

      return await this.stripeService.products.create(productData, options);
    } catch (error) {
      const err = error as Error;
      Logger.error({
        location: err.stack,
        message: `Error creating product: ${err.message}`,
      });
      return null;
    }
  }

  public async listProducts(options?: Stripe.RequestOptions): Promise<Stripe.Product[] | null> {
    try {
      if (!this.stripeService) {
        throw new Error('Stripe instance is not initialized.');
      }
      const products = await this.stripeService.products.list(options);
      return products.data;
    } catch (error) {
      const err = error as Error;
      Logger.error({
        location: err.stack,
        message: `Error retrieving products: ${err.message}`,
      });
      return null;
    }
  }

  public async getProduct(productId: string, options?: Stripe.RequestOptions): Promise<Stripe.Product | null> {
    try {
      if (!this.stripeService) {
        throw new Error('Stripe instance is not initialized.');
      }
      const product = await this.stripeService.products.retrieve(productId, options);
      return product;
    } catch (error) {
      const err = error as Error;
      Logger.error({
        location: err.stack,
        message: `Error retrieving product: ${err.message}`,
      });
      return null;
    }
  }

  public async updateProduct(
    productId: string,
    updates: Stripe.ProductUpdateParams,
    options?: Stripe.RequestOptions,
  ): Promise<Stripe.Product | null> {
    try {
      if (!this.stripeService) {
        throw new Error('Stripe instance is not initialized.');
      }
      const updatedProduct = await this.stripeService.products.update(
        productId,
        updates,
        options,
      );
      return updatedProduct;
    } catch (error) {
      const err = error as Error;
      Logger.error({
        location: err.stack,
        message: `Error updating product: ${err.message}`,
      });
      return null;
    }
  }

  public async deleteProduct(productId: string, options?: Stripe.RequestOptions): Promise<boolean> {
    try {
      if (!this.stripeService) {
        throw new Error('Stripe instance is not initialized.');
      }
      const deletedProduct = await this.stripeService.products.del(productId, options);
      return deletedProduct.deleted;
    } catch (error) {
      const err = error as Error;
      Logger.error({
        location: err.stack,
        message: `Error deleting product: ${err.message}`,
      });
      return false;
    }
  }
}

export default StripeProductCrudService;
