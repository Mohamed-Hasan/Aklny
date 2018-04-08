class OrdersController < ApplicationController
    def create
        params.require(:order).permit!
        user_id = 1 #to be get from authentication
        params[:order][:user_id] = user_id
        @order = Order.new(params[:order])
        if @order.save
            invited = params[:invited]
            self.class.notify(invited,"invitation",@order.id,"true");
            render json: {success: true, message: invited}
        else
            render json: {success: false, message: @order.errors}
        end
    end

    def delete
    	Order.delete(params[:oid])
        render json: {success: true, message: "order deleted"}
    end

    def edit
        params.require(:order).permit!
    	@order = Order.find(params[:oid])
    	if @order
    		@order.update(params[:order])
        	render json: {success: true, message: "order updated"}
    	end
    end

    def join
        self.class.notify(params[:uid],"join",params[:oid],"false")
    end

    def self.notify (users,type,oid,invited) 
        users.each do |user|
            notif = {
                notification_type: type,
                order_id: oid,
                invited: invited,
                user_id: user,
            }
            @notification = Notification.create(notif);
            #action cable here
        end
    end
end